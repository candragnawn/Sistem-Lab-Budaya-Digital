<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\TeachingMaterialResource;
use App\Models\TeachingMaterial;

class TeachingMaterialController extends Controller
{
    public function index()
    {
        $data = TeachingMaterial::all();
        return TeachingMaterialResource::collection($data);
    }

    public function store(Request $request)
    {
        $data = TeachingMaterial::create($request->all());
        return new TeachingMaterialResource($data);
    }

    public function show($id)
    {
        $data = TeachingMaterial::findOrFail($id);
        return new TeachingMaterialResource($data);
    }

    public function update(Request $request, $id)
    {
        $data = TeachingMaterial::findOrFail($id);
        $data->update($request->all());
        return new TeachingMaterialResource($data);
    }

    public function destroy($id)
    {
        $data = TeachingMaterial::findOrFail($id);
        $data->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Data berhasil dihapus'
        ], 200);
    }
}
