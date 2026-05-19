<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\LecturerEducationResource;
use App\Models\LecturerEducation;

class LecturerEducationController extends Controller
{
    public function index()
    {
        $data = LecturerEducation::all();
        return LecturerEducationResource::collection($data);
    }

    public function store(Request $request)
    {
        $data = LecturerEducation::create($request->all());
        return new LecturerEducationResource($data);
    }

    public function show($id)
    {
        $data = LecturerEducation::findOrFail($id);
        return new LecturerEducationResource($data);
    }

    public function update(Request $request, $id)
    {
        $data = LecturerEducation::findOrFail($id);
        $data->update($request->all());
        return new LecturerEducationResource($data);
    }

    public function destroy($id)
    {
        $data = LecturerEducation::findOrFail($id);
        $data->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Data berhasil dihapus'
        ], 200);
    }
}
