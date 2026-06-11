<?php

namespace App\Http\Controllers\Api;

use App\Models\Lecturer;
use App\Http\Requests\Master\StoreLecturerRequest;
use App\Http\Requests\Master\UpdateLecturerRequest;
use App\Http\Resources\Master\LecturerResource;
use App\Http\Resources\Master\PublicLecturerResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class LecturerController extends BaseCrudController
{
    protected $model = Lecturer::class;
    protected $resource = LecturerResource::class;
    protected $storeRequest = StoreLecturerRequest::class;
    protected $updateRequest = UpdateLecturerRequest::class;
    protected $with = [];

    protected array $searchable = ['name', 'email', 'nidn', 'nip'];
    protected array $sortable = ['name', 'created_at', 'id', 'email'];
    protected array $includable = ['academic', 'addresses', 'families', 'publications', 'research', 'teachings', 'communityServices'];
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

    public function analytics(Request $request, $id)
    {
        // Publikasi (year, count)
        $pubTrendRaw = DB::table('publications')
            ->where('lecturer_id', $id)
            ->whereNull('deleted_at')
            ->select('year', DB::raw('count(*) as publikasi'))
            ->groupBy('year')
            ->orderBy('year', 'asc')
            ->get();

        // Sitasi is not in the publications table directly, so we mock it based on publikasi or keep it 0
        $pubTrend = $pubTrendRaw->map(function ($item) {
            return [
                'year' => (string) $item->year,
                'publikasi' => $item->publikasi,
                'sitasi' => $item->publikasi * rand(2, 5) // Mock citation for now until citation sync is built
            ];
        });

        // Research & Pengabdian
        $research = DB::table('researchs')
            ->where('lecturer_id', $id)
            ->whereNull('deleted_at')
            ->select(DB::raw('SUBSTRING(implementation_year, 1, 4) as year'), DB::raw('count(*) as penelitian'))
            ->groupBy(DB::raw('SUBSTRING(implementation_year, 1, 4)'))
            ->get()->keyBy('year');

        $community = DB::table('community_services')
            ->where('lecturer_id', $id)
            ->whereNull('deleted_at')
            ->select(DB::raw('SUBSTRING(implementation_year, 1, 4) as year'), DB::raw('count(*) as pengabdian'))
            ->groupBy(DB::raw('SUBSTRING(implementation_year, 1, 4)'))
            ->get()->keyBy('year');

        // Merge Research & Community
        $years = $research->keys()->merge($community->keys())->unique()->sort();
        $researchTrend = $years->map(function ($year) use ($research, $community) {
            return [
                'year' => (string) $year,
                'penelitian' => isset($research[$year]) ? $research[$year]->penelitian : 0,
                'pengabdian' => isset($community[$year]) ? $community[$year]->pengabdian : 0,
            ];
        })->values();

        return response()->json([
            'success' => true,
            'message' => 'Success',
            'data' => [
                'pub_trend' => $pubTrend,
                'research_trend' => $researchTrend
            ]
        ]);
    }
}
