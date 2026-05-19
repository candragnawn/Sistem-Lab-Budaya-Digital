<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\LecturerStudyResource;
use App\Models\LecturerStudy;

class LecturerStudyController extends Controller
{
    public function index()
    {
        $data = LecturerStudy::all();
        return LecturerStudyResource::collection($data);
    }

    public function store(Request $request)
    {
        $data = LecturerStudy::create($request->all());
        return new LecturerStudyResource($data);
    }

    public function show($id)
    {
        $data = LecturerStudy::findOrFail($id);
        return new LecturerStudyResource($data);
    }

    public function update(Request $request, $id)
    {
        $data = LecturerStudy::findOrFail($id);
        $data->update($request->all());
        return new LecturerStudyResource($data);
    }

    public function destroy($id)
    {
        $data = LecturerStudy::findOrFail($id);
        $data->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Data berhasil dihapus'
        ], 200);
    }
}
