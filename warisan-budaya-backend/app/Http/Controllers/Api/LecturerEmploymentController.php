<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\LecturerEmploymentResource;
use App\Models\LecturerEmployment;

class LecturerEmploymentController extends Controller
{
    public function index()
    {
        $data = LecturerEmployment::all();
        return LecturerEmploymentResource::collection($data);
    }

    public function store(Request $request)
    {
        $data = LecturerEmployment::create($request->all());
        return new LecturerEmploymentResource($data);
    }

    public function show($id)
    {
        $data = LecturerEmployment::findOrFail($id);
        return new LecturerEmploymentResource($data);
    }

    public function update(Request $request, $id)
    {
        $data = LecturerEmployment::findOrFail($id);
        $data->update($request->all());
        return new LecturerEmploymentResource($data);
    }

    public function destroy($id)
    {
        $data = LecturerEmployment::findOrFail($id);
        $data->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Data berhasil dihapus'
        ], 200);
    }
}
