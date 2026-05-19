<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\LecturerMentoringResource;
use App\Models\LecturerMentoring;

class LecturerMentoringController extends Controller
{
    public function index()
    {
        $data = LecturerMentoring::all();
        return LecturerMentoringResource::collection($data);
    }

    public function store(Request $request)
    {
        $data = LecturerMentoring::create($request->all());
        return new LecturerMentoringResource($data);
    }

    public function show($id)
    {
        $data = LecturerMentoring::findOrFail($id);
        return new LecturerMentoringResource($data);
    }

    public function update(Request $request, $id)
    {
        $data = LecturerMentoring::findOrFail($id);
        $data->update($request->all());
        return new LecturerMentoringResource($data);
    }

    public function destroy($id)
    {
        $data = LecturerMentoring::findOrFail($id);
        $data->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Data berhasil dihapus'
        ], 200);
    }
}
