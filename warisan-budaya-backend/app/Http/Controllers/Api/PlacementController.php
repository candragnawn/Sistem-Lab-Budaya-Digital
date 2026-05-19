<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\PlacementResource;
use App\Models\Placement;

class PlacementController extends Controller
{
    public function index()
    {
        $data = Placement::all();
        return PlacementResource::collection($data);
    }

    public function store(Request $request)
    {
        $data = Placement::create($request->all());
        return new PlacementResource($data);
    }

    public function show($id)
    {
        $data = Placement::findOrFail($id);
        return new PlacementResource($data);
    }

    public function update(Request $request, $id)
    {
        $data = Placement::findOrFail($id);
        $data->update($request->all());
        return new PlacementResource($data);
    }

    public function destroy($id)
    {
        $data = Placement::findOrFail($id);
        $data->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Data berhasil dihapus'
        ], 200);
    }
}
