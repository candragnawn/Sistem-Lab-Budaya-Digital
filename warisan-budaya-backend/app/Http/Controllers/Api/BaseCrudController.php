<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

abstract class BaseCrudController extends Controller
{
    protected $model;

    protected $with = [];

    protected $resource = null;

    protected $storeRequest = null;

    protected $updateRequest = null;

    public function index()
    {
        $query = $this->model::query();

        if (!empty($this->with)) {
            $query->with($this->with);
        }

        $items = $query->latest()->paginate(10);

        return $this->successResponse($items);
    }

    public function store(Request $request)
    {
        $validated = $request->validate(
            app($this->storeRequest)->rules()
        );

        // $validated['lecturer_id'] = auth()->guard()->user()->lecturer_id;
        $validated['lecturer_id'] = $request->user() ? $request->user()->lecturer_id : null;

        $item = $this->model::create($validated);

        $this->loadRelations($item);

        return $this->successResponse($item, 201);
    }

    public function show($id)
    {
        $query = $this->model::query();

        if (!empty($this->with)) {
            $query->with($this->with);
        }

        $item = $query->findOrFail($id);

        return $this->successResponse($item);
    }

    public function update(Request $request, $id)
    {
        $validated = $request->validate(
            app($this->updateRequest)->rules()
        );

        $item = $this->model::findOrFail($id);

        $item->update($validated);

        $this->loadRelations($item);

        return $this->successResponse($item);
    }

    public function destroy($id)
    {
        $item = $this->model::findOrFail($id);

        $item->delete();

        return response()->json([
            'success' => true,
            'message' => 'Data deleted successfully'
        ], 200);
    }

    protected function loadRelations($item)
    {
        if (!empty($this->with)) {
            $item->load($this->with);
        }
    }

    protected function successResponse($data, $code = 200)
    {
        if ($this->resource) {

            if ($data instanceof \Illuminate\Pagination\LengthAwarePaginator) {
                return $this->resource::collection($data);
            }

            return new $this->resource($data);
        }

        return response()->json([
            'success' => true,
            'data' => $data
        ], $code);
    }
}