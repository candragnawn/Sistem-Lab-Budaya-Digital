<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\StudentSupervisionResource;
use App\Models\StudentSupervision;

class StudentSupervisionController extends Controller
{
    public function index()
    {
        $data = StudentSupervision::all();
        return StudentSupervisionResource::collection($data);
    }

    public function store(Request $request)
    {
        $data = StudentSupervision::create($request->all());
        return new StudentSupervisionResource($data);
    }

    public function show($id)
    {
        $data = StudentSupervision::findOrFail($id);
        return new StudentSupervisionResource($data);
    }

    public function update(Request $request, $id)
    {
        $data = StudentSupervision::findOrFail($id);
        $data->update($request->all());
        return new StudentSupervisionResource($data);
    }

    public function destroy($id)
    {
        $data = StudentSupervision::findOrFail($id);
        $data->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Data berhasil dihapus'
        ], 200);
    }
}
