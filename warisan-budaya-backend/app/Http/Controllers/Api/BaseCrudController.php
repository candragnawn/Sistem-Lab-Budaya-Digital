<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Cache\TaggableStore;

/**
 * BaseCrudController - Advanced CRUD with filtering, pagination, and soft deletes
 *
 * Features:
 * 1. Dynamic Pagination (?per_page=)
 * 2. Search (?search=)
 * 3. Sorting (?sort=column:asc)
 * 4. Filter by query parameters
 * 5. Include Relations (?include=relation1,relation2)
 * 6. Count Relations (?with_count=relation1,relation2)
 * 7. Soft Delete Support
 * 8. Trash/Restore/Force Delete endpoints
 * 9. Standard API Response Format
 * 10. Ownership Validation
 * 11. Resource Support
 * 12. Laravel 11 Best Practices
 * 13. Frontend Friendly Responses
 */
abstract class BaseCrudController extends Controller
{
    /**
     * The Eloquent model instance
     */
    protected $model;

    /**
     * Default eager load relations
     */
    protected $with = [];

    /**
     * API Resource class for responses
     */
    protected $resource = null;

    /**
     * Store Request validation class
     */
    protected $storeRequest = null;

    /**
     * Update Request validation class
     */
    protected $updateRequest = null;

    /**
     * Columns that can be searched
     * Override in child controller
     * Example: ['name', 'email', 'nidn']
     */
    protected array $searchable = [];

    /**
     * Columns that can be sorted
     * Override in child controller
     * Example: ['name', 'created_at', 'email']
     */
    protected array $sortable = ['created_at', 'id'];

    /**
     * Relations that can be included
     * Override in child controller
     * Example: ['lecturer', 'category', 'publications']
     */
    protected array $includable = [];

    /**
     * Relations that can be counted
     * Override in child controller
     * Example: ['publications', 'teachings']
     */
    protected array $countable = [];

    /**
     * Columns for global filtering (besides searchable)
     * Override in child controller
     */
    protected array $filterable = [];

    /**
     * Default per page limit
     */
    protected int $defaultPerPage = 15;

    /**
     * Maximum per page limit
     */
    protected int $maxPerPage = 100;

    /**
     * ============================================================================
     * GET /api/resource - List all records with filtering, pagination, search
     * ============================================================================
     */
    public function index(Request $request)
    {
        $query = $this->model::query();

        // Apply ownership filter (lecturer_id)
        $query = $this->applyOwnershipFilter($request, $query);

        // Apply soft delete filter (show active by default, unless ?with_trashed=1)
        $query = $this->applySoftDeleteFilter($request, $query);

        // Apply search filter
        $query = $this->applySearch($request, $query);

        // Apply generic filters from query string
        $query = $this->applyFilters($request, $query);

        // Apply eager loading (relations)
        $query = $this->applyIncludes($request, $query);

        // Apply count on relations
        $query = $this->applyWithCount($request, $query);

        // Apply sorting
        $query = $this->applySorting($request, $query);

        // Apply pagination with dynamic per_page
        $perPage = $this->getPerPage($request);
        
        $cacheKey = $this->getCacheKey($request, 'index_');

        $paginated = $this->rememberCache($cacheKey, function () use ($query, $perPage) {
            return $query->paginate($perPage);
        });

        return $this->successPaginatedResponse($paginated, $request);
    }

    /**
     * ============================================================================
     * GET /api/resource/trash - List only soft deleted records
     * ============================================================================
     */
    public function trash(Request $request)
    {
        // Check if model uses soft deletes
        if (!$this->modelUsesSoftDeletes()) {
            return $this->errorResponse('This resource does not support soft deletes', 422);
        }

        $query = $this->model::onlyTrashed();

        // Apply ownership filter
        $query = $this->applyOwnershipFilter($request, $query);

        // Apply search filter
        $query = $this->applySearch($request, $query);

        // Apply eager loading
        $query = $this->applyIncludes($request, $query);

        // Apply sorting
        $query = $this->applySorting($request, $query);

        // Apply pagination
        $perPage = $this->getPerPage($request);
        $paginated = $query->paginate($perPage);

        return $this->successPaginatedResponse($paginated, $request);
    }

    /**
     * ============================================================================
     * POST /api/resource - Create new record
     * ============================================================================
     */
    public function store(Request $request)
    {
        // Get validated data from request class
        $requestClass = app($this->storeRequest);
        $validated = $request->validate($requestClass->rules());

        // Auto-add lecturer_id if model has this attribute
        if ($this->modelHasAttribute('lecturer_id') && $request->user()) {
            $validated['lecturer_id'] = $request->user()->lecturer_id;
        }

        // Wrap in transaction for data consistency
        $item = DB::transaction(function () use ($validated) {
            return $this->model::create($validated);
        });

        // Load relations
        $this->loadRelations($item);

        $this->flushCache();

        return $this->successResponse(
            $this->resource ? new $this->resource($item) : $item,
            201,
            'Data created successfully'
        );
    }

    /**
     * ============================================================================
     * GET /api/resource/{id} - Get single record with ownership validation
     * ============================================================================
     */
    public function show(Request $request, $id)
    {
        $query = $this->model::query();

        // Include soft deleted if ?with_trashed=1
        if ($request->input('with_trashed') === '1') {
            $query = $query->withTrashed();
        }

        // Apply includes
        $query = $this->applyIncludes($request, $query);
        $query = $this->applyWithCount($request, $query);

        $cacheKey = $this->getCacheKey($request, 'show_' . $id);

        $item = $this->rememberCache($cacheKey, function () use ($query, $id) {
            return $query->findOrFail($id);
        });

        // CRITICAL: Check ownership on read operations
        $this->checkOwnership($request, $item);

        return $this->successResponse(
            $this->resource ? new $this->resource($item) : $item,
            200
        );
    }

    /**
     * ============================================================================
     * PUT/PATCH /api/resource/{id} - Update record
     * ============================================================================
     */
    public function update(Request $request, $id)
    {
        $item = $this->model::findOrFail($id);

        // Check ownership
        $this->checkOwnership($request, $item);

        // Get validated data
        $requestClass = app($this->updateRequest);
        $validated = $request->validate($requestClass->rules());

        // CRITICAL SECURITY FIX: Prevent user from changing ownership (Mass Assignment)
        if ($this->modelHasAttribute('lecturer_id') && $request->user()) {
            unset($validated['lecturer_id']);
        }

        // Wrap in transaction for data consistency
        $item = DB::transaction(function () use ($item, $validated) {
            $item->update($validated);
            return $item;
        });

        // Reload relations
        $this->loadRelations($item);

        $this->flushCache();

        return $this->successResponse(
            $this->resource ? new $this->resource($item) : $item,
            200,
            'Data updated successfully'
        );
    }

    /**
     * ============================================================================
     * DELETE /api/resource/{id} - Soft delete record
     * ============================================================================
     */
    public function destroy(Request $request, $id)
    {
        $item = $this->model::findOrFail($id);

        // Check ownership
        $this->checkOwnership($request, $item);

        // Soft delete in transaction
        DB::transaction(function () use ($item) {
            $item->delete();
        });

        $this->flushCache();

        return $this->successResponse(
            null,
            200,
            'Data deleted successfully'
        );
    }

    /**
     * ============================================================================
     * POST /api/resource/{id}/restore - Restore soft deleted record
     * ============================================================================
     */
    public function restore(Request $request, $id)
    {
        // Check if model uses soft deletes
        if (!$this->modelUsesSoftDeletes()) {
            return $this->errorResponse('This resource does not support soft deletes', 422);
        }

        // Get including soft deleted
        $item = $this->model::withTrashed()->findOrFail($id);

        // Check ownership
        $this->checkOwnership($request, $item);

        // Check if actually deleted
        if (!$item->trashed()) {
            return $this->errorResponse('Record is not deleted', 422);
        }

        // Restore in transaction
        DB::transaction(function () use ($item) {
            $item->restore();
        });

        $this->flushCache();

        return $this->successResponse(
            $this->resource ? new $this->resource($item) : $item,
            200,
            'Data restored successfully'
        );
    }

    /**
     * ============================================================================
     * DELETE /api/resource/{id}/force-delete - Permanently delete record
     * ============================================================================
     */
    public function forceDelete(Request $request, $id)
    {
        // Check if model uses soft deletes
        if (!$this->modelUsesSoftDeletes()) {
            return $this->errorResponse('This resource does not support force delete', 422);
        }

        // Get including soft deleted
        $item = $this->model::withTrashed()->findOrFail($id);

        //Check ownership
        $this->checkOwnership($request, $item);

        // Permanently delete in transaction
        DB::transaction(function () use ($item) {
            $item->forceDelete();
        });

        $this->flushCache();

        return $this->successResponse(
            null,
            200,
            'Data permanently deleted'
        );
    }

    /**
     * ============================================================================
     * FILTERING & QUERY BUILDING METHODS
     * ============================================================================
     */

    /**
     * Apply ownership filter based on lecturer_id
     * Prevents users from seeing other lecturers' data
     */
    protected function applyOwnershipFilter(Request $request, $query)
    {
        if ($this->modelHasAttribute('lecturer_id') && $request->user()) {
            if ($request->user()->role === 'admin') {
                return $query;
            }
            return $query->where('lecturer_id', $request->user()->lecturer_id);
        }
        return $query;
    }

    /**
     * Apply soft delete filter
     * By default shows only active records unless ?with_trashed=1
     */
    protected function applySoftDeleteFilter(Request $request, $query)
    {
        if (!$this->modelUsesSoftDeletes()) {
            return $query;
        }

        // If explicitly requesting trashed only
        if ($request->input('only_trashed') === '1') {
            return $query->onlyTrashed();
        }

        // If requesting both active and trashed
        if ($request->input('with_trashed') === '1') {
            return $query->withTrashed();
        }

        // Default: show only active (not deleted)
        return $query;
    }

    /**
     * Apply search across searchable columns
     * Example: ?search=john
     */
    protected function applySearch(Request $request, $query)
    {
        $search = $request->input('search');

        if (!$search || empty($this->searchable)) {
            return $query;
        }

        return $query->where(function ($q) use ($search) {
            foreach ($this->searchable as $column) {
                $q->orWhere($column, 'LIKE', "%{$search}%");
            }
        });
    }

    /**
     * Apply generic filters from query parameters
     * Example: ?status=active&faculty=FMIPA
     */
    protected function applyFilters(Request $request, $query)
    {
        $allowedFilters = array_merge(
            $this->filterable,
            ['status', 'faculty', 'department', 'year']  // Common filters
        );

        foreach ($allowedFilters as $filter) {
            if ($request->has($filter)) {
                $value = $request->input($filter);
                $query = $query->where($filter, $value);
            }
        }

        return $query;
    }

    /**
     * Apply relation includes
     * Example: ?include=lecturer,category,publications
     */
    protected function applyIncludes(Request $request, $query)
    {
        $includes = $request->input('include');

        if (!$includes) {
            // Load default relations
            return $query->with($this->with);
        }

        // Parse comma-separated includes
        $requestedIncludes = array_map('trim', explode(',', $includes));

        // Merge with defaults and filter by allowed
        $mergedIncludes = array_unique(array_merge(
            $this->with,
            array_intersect($requestedIncludes, $this->includable)
        ));

        return $query->with($mergedIncludes);
    }

    /**
     * Apply relation counts
     * Example: ?with_count=publications,teachings
     */
    protected function applyWithCount(Request $request, $query)
    {
        $withCount = $request->input('with_count');

        if (!$withCount) {
            return $query;
        }

        // Parse comma-separated counts
        $requestedCounts = array_map('trim', explode(',', $withCount));

        // Filter by allowed countable relations
        $allowedCounts = array_intersect($requestedCounts, $this->countable);

        if (!empty($allowedCounts)) {
            $query = $query->withCount($allowedCounts);
        }

        return $query;
    }

    /**
     * Apply sorting
     * Example: ?sort=name:asc (default) or ?sort=created_at:desc
     */
    protected function applySorting(Request $request, $query)
    {
        $sort = $request->input('sort', 'created_at:desc');

        if (!$sort) {
            return $query->latest();
        }

        // Parse sort parameter (column:direction)
        [$column, $direction] = array_pad(explode(':', $sort), 2, 'asc');
        $column = trim($column);
        $direction = strtolower(trim($direction)) === 'desc' ? 'desc' : 'asc';

        // Only allow sortable columns (security)
        if (in_array($column, $this->sortable)) {
            return $query->orderBy($column, $direction);
        }

        return $query->latest();
    }

    /**
     * Get per_page from request with validation
     * Example: ?per_page=50
     */
    protected function getPerPage(Request $request): int
    {
        $perPage = (int) $request->input('per_page', $this->defaultPerPage);

        // Ensure within limits
        return min(max($perPage, 1), $this->maxPerPage);
    }


    protected function checkOwnership(Request $request, Model $item)
    {
        if (!$request->user()) {
            return;
        }

        // If item has lecturer_id and user is not admin
        if ($item->hasAttribute('lecturer_id')) {
            if ($request->user()->role === 'admin') {
                return;
            }
            if ($item->lecturer_id !== $request->user()->lecturer_id) {
                abort(403, 'Anda tidak memiliki akses ke resource ini');
            }
        }
    }

    /**
     * Load all relations for a model
     */
    protected function loadRelations(Model $item)
    {
        if (!empty($this->with)) {
            $item->load($this->with);
        }
    }

    /**
     * Check if model has specific attribute
     */
    protected function modelHasAttribute(string $attribute): bool
    {
        return in_array($attribute, (new $this->model)->getFillable());
    }

    /**
     * Check if model uses SoftDeletes trait
     */
    protected function modelUsesSoftDeletes(): bool
    {
        return in_array(
            SoftDeletes::class,
            class_uses_recursive($this->model)
        );
    }


    protected function successResponse($data = null, int $code = 200, string $message = null)
    {
        $response = [
            'success' => true,
            'message' => $message ?? ($code === 201 ? 'Created successfully' : 'Success'),
            'data' => $data,
        ];

        if ($code === 200 && $data === null) {
            // For delete operations, don't include null data
            unset($response['data']);
        }

        return response()->json($response, $code);
    }

    /**
     * Success response for paginated list
     * Includes meta information (pagination, etc)
     */
    protected function successPaginatedResponse($paginated, Request $request)
    {
        $resource = $this->resource;

        // Build response with meta information
        $response = [
            'success' => true,
            'message' => 'Success',
            'data' => $resource 
                ? $resource::collection($paginated->items())
                : $paginated->items(),
            'meta' => [
                'total' => $paginated->total(),
                'per_page' => $paginated->perPage(),
                'current_page' => $paginated->currentPage(),
                'last_page' => $paginated->lastPage(),
                'from' => $paginated->firstItem(),
                'to' => $paginated->lastItem(),
                'count' => count($paginated->items()),
            ],
            'links' => [
                'first' => $paginated->url(1),
                'last' => $paginated->url($paginated->lastPage()),
                'prev' => $paginated->previousPageUrl(),
                'next' => $paginated->nextPageUrl(),
            ]
        ];

        return response()->json($response, 200);
    }

    /**
     * Error response
     */
    protected function errorResponse(string $message, int $code = 422, $errors = null)
    {
        $response = [
            'success' => false,
            'message' => $message,
        ];

        if ($errors) {
            $response['errors'] = $errors;
        }

        return response()->json($response, $code);
    }

    protected function getCacheKey(Request $request, string $prefix = ''): string
    {
        $tableName = app($this->model)->getTable();
        $queryString = http_build_query($request->query());
        $userId = $request->user() ? $request->user()->id : 'guest';
        return $tableName . '_' . $prefix . md5($userId . '_' . $request->url() . '?' . $queryString);
    }

    protected function rememberCache(string $key, \Closure $callback)
    {
        try {
            if (Cache::getStore() instanceof TaggableStore || method_exists(Cache::getStore(), 'tags')) {
                return Cache::tags([app($this->model)->getTable()])->remember($key, 86400, $callback);
            }
        } catch (\Exception $e) {
            // Fallback
        }
        return Cache::remember($key, 86400, $callback);
    }

    protected function flushCache(): void
    {
        try {
            if (Cache::getStore() instanceof TaggableStore || method_exists(Cache::getStore(), 'tags')) {
                Cache::tags([app($this->model)->getTable()])->flush();
                return;
            }
        } catch (\Exception $e) {
            // Fallback
        }
        Cache::flush();
    }
}