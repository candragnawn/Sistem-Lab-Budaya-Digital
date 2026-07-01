<?php

namespace App\Http\Controllers\Api;

use App\Models\Lecturer;
use App\Http\Requests\Master\StoreLecturerRequest;
use App\Http\Requests\Master\UpdateLecturerRequest;
use App\Http\Resources\Master\LecturerResource;
use App\Http\Resources\Master\PublicLecturerResource;
use Illuminate\Http\Request;

class LecturerController extends BaseCrudController
{
    protected $model = Lecturer::class;
    protected $resource = LecturerResource::class;
    protected $storeRequest = StoreLecturerRequest::class;
    protected $updateRequest = UpdateLecturerRequest::class;
    protected $with = [];

    protected array $searchable = ['name', 'email', 'nidn', 'nip'];
    protected array $sortable = ['name', 'created_at', 'id', 'email', 'sinta_score_total', 'sinta_score_3yr'];
    protected array $includable = ['academic', 'addresses', 'families', 'identities', 'inpassings', 'stats', 'placements', 'positions', 'professorEmeritus', 'ranks', 'workContracts', 'hki', 'publicationAuthors', 'teachings', 'detaserings', 'academicOrations', 'additionalTasks', 'lectureMentorings', 'studentDevelopments', 'studentExaminations', 'studentSupervisions', 'teachingActivities', 'teachingMaterials', 'visitingScientists', 'communityServices', 'journalManagers', 'speakers', 'structuralPositions', 'publications', 'research', 'diklats', 'certifications', 'competencyTests', 'awards', 'otherSupportingActivities', 'professionalMemberships', 'allowances', 'scholarships', 'welfares'];
    protected array $countable = ['publications', 'research', 'teachings', 'communityServices'];

    public function index(Request $request)
    {
        if ($request->routeIs('public.*')) {
            $this->resource = PublicLecturerResource::class;
            $request->mergeIfMissing(['per_page' => 15]);

            $query = $this->model::query()->where('is_verified', true);
            $query = $this->applySearch($request, $query);
            $query = $this->applyFilters($request, $query);
            $query = $this->applyIncludes($request, $query);
            $query = $this->applyWithCount($request, $query);
            $query = $this->applySorting($request, $query);

            $paginated = $query->paginate($this->getPerPage($request));
            return $this->successPaginatedResponse($paginated, $request);
        }

        return parent::index($request);
    }

    public function show(Request $request, $id)
    {
        if ($request->routeIs('public.*')) {
            $this->resource = PublicLecturerResource::class;

            $query = $this->model::query()->where('is_verified', true);
            $query = $this->applyIncludes($request, $query);
            $query = $this->applyWithCount($request, $query);

            $item = $query->findOrFail($id);

            return $this->successResponse(new PublicLecturerResource($item), 200);
        }

        return parent::show($request, $id);
    }
}
