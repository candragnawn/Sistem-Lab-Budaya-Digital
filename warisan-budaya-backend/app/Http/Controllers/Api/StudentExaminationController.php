<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\StudentExaminationResource;
use App\Models\StudentExamination;

class StudentExaminationController extends Controller
{
    public function index()
    {
        $data = StudentExamination::all();
        return StudentExaminationResource::collection($data);
    }

    public function store(Request $request)
    {
        $data = StudentExamination::create($request->all());
        return new StudentExaminationResource($data);
    }

    public function show($id)
    {
        $data = StudentExamination::findOrFail($id);
        return new StudentExaminationResource($data);
    }

    public function update(Request $request, $id)
    {
        $data = StudentExamination::findOrFail($id);
        $data->update($request->all());
        return new StudentExaminationResource($data);
    }

    public function destroy($id)
    {
        $data = StudentExamination::findOrFail($id);
        $data->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Data berhasil dihapus'
        ], 200);
    }
}
