<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\AcademicOrationResource;
use App\Models\AcademicOration;

class AcademicOrationController extends Controller
{
    public function index()
    {
        $data = AcademicOration::all();
        return AcademicOrationResource::collection($data);
    }

    public function store(Request $request)
    {
        $data = AcademicOration::create($request->all());
        return new AcademicOrationResource($data);
    }

    public function show($id)
    {
        $data = AcademicOration::findOrFail($id);
        return new AcademicOrationResource($data);
    }

    public function update(Request $request, $id)
    {
        $data = AcademicOration::findOrFail($id);
        $data->update($request->all());
        return new AcademicOrationResource($data);
    }

    public function destroy($id)
    {
        $data = AcademicOration::findOrFail($id);
        $data->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Data berhasil dihapus'
        ], 200);
    }
}
