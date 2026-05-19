<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\LecturerRankResource;
use App\Models\LecturerRank;

class LecturerRankController extends Controller
{
    public function index()
    {
        $data = LecturerRank::all();
        return LecturerRankResource::collection($data);
    }

    public function store(Request $request)
    {
        $data = LecturerRank::create($request->all());
        return new LecturerRankResource($data);
    }

    public function show($id)
    {
        $data = LecturerRank::findOrFail($id);
        return new LecturerRankResource($data);
    }

    public function update(Request $request, $id)
    {
        $data = LecturerRank::findOrFail($id);
        $data->update($request->all());
        return new LecturerRankResource($data);
    }

    public function destroy($id)
    {
        $data = LecturerRank::findOrFail($id);
        $data->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Data berhasil dihapus'
        ], 200);
    }
}
