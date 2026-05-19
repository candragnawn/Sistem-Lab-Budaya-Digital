<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\StudentDevelopmentResource;
use App\Models\StudentDevelopment;

class StudentDevelopmentController extends Controller
{
    public function index()
    {
        $data = StudentDevelopment::all();
        return StudentDevelopmentResource::collection($data);
    }

    public function store(Request $request)
    {
        $data = StudentDevelopment::create($request->all());
        return new StudentDevelopmentResource($data);
    }

    public function show($id)
    {
        $data = StudentDevelopment::findOrFail($id);
        return new StudentDevelopmentResource($data);
    }

    public function update(Request $request, $id)
    {
        $data = StudentDevelopment::findOrFail($id);
        $data->update($request->all());
        return new StudentDevelopmentResource($data);
    }

    public function destroy($id)
    {
        $data = StudentDevelopment::findOrFail($id);
        $data->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Data berhasil dihapus'
        ], 200);
    }
}
