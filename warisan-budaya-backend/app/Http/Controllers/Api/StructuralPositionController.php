<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\StructuralPositionResource;
use App\Models\StructuralPosition;

class StructuralPositionController extends Controller
{
    public function index()
    {
        $data = StructuralPosition::all();
        return StructuralPositionResource::collection($data);
    }

    public function store(Request $request)
    {
        $data = StructuralPosition::create($request->all());
        return new StructuralPositionResource($data);
    }

    public function show($id)
    {
        $data = StructuralPosition::findOrFail($id);
        return new StructuralPositionResource($data);
    }

    public function update(Request $request, $id)
    {
        $data = StructuralPosition::findOrFail($id);
        $data->update($request->all());
        return new StructuralPositionResource($data);
    }

    public function destroy($id)
    {
        $data = StructuralPosition::findOrFail($id);
        $data->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Data berhasil dihapus'
        ], 200);
    }
}
