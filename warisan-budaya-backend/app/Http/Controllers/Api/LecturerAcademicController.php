<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\LecturerAcademicResource;
use App\Models\LecturerAcademic;

class LecturerAcademicController extends Controller
{
    public function index()
    {
        $data = LecturerAcademic::all();
        return LecturerAcademicResource::collection($data);
    }

    public function store(Request $request)
    {
        $data = LecturerAcademic::create($request->all());
        return new LecturerAcademicResource($data);
    }

    public function show($id)
    {
        $data = LecturerAcademic::findOrFail($id);
        return new LecturerAcademicResource($data);
    }

    public function update(Request $request, $id)
    {
        $data = LecturerAcademic::findOrFail($id);
        $data->update($request->all());
        return new LecturerAcademicResource($data);
    }

    public function destroy($id)
    {
        $data = LecturerAcademic::findOrFail($id);
        $data->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Data berhasil dihapus'
        ], 200);
    }
}
