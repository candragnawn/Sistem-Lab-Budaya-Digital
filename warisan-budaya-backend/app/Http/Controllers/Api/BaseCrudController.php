<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

abstract class BaseCrudController extends Controller
{
    /**
     * The model class name.
     *
     * @var string
     */
    protected $model;

    /**
     * Optional: Array of relationships to eager load.
     *
     * @var array
     */
    protected $with = [];

    /**
     * Optional: API Resource class to transform the data.
     *
     * @var string|null
     */
    protected $resource = null;

    public function index()
    {
        $query = $this->model::query();

        if (!empty($this->with)) {
            $query->with($this->with);
        }

        $items = $query->get();

        if ($this->resource) {
            return $this->resource::collection($items);
        }

        return response()->json($items);
    }

    public function store(Request $request)
    {
        $item = $this->model::create($request->all());

        if (!empty($this->with)) {
            $item->load($this->with);
        }

        if ($this->resource) {
            return new $this->resource($item);
        }

        return response()->json($item, 201);
    }

    public function show($id)
    {
        $query = $this->model::query();

        if (!empty($this->with)) {
            $query->with($this->with);
        }

        $item = $query->findOrFail($id);

        if ($this->resource) {
            return new $this->resource($item);
        }

        return response()->json($item);
    }

    public function update(Request $request, $id)
    {
        $item = $this->model::findOrFail($id);
        $item->update($request->all());

        if (!empty($this->with)) {
            $item->load($this->with);
        }

        if ($this->resource) {
            return new $this->resource($item);
        }

        return response()->json($item);
    }

    public function destroy($id)
    {
        $item = $this->model::findOrFail($id);
        $item->delete();
        return response()->json(null, 204);
    }
}
