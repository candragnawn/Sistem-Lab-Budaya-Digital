<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\LecturerFamilyResource;
use App\Models\LecturerFamily;

class LecturerFamilyController extends Controller
{
    public function index()
    {
        $data = LecturerFamily::all();
        return LecturerFamilyResource::collection($data);
    }

    public function store(Request $request)
    {
        $data = LecturerFamily::create($request->all());
        return new LecturerFamilyResource($data);
    }

    public function show($id)
    {
        $data = LecturerFamily::findOrFail($id);
        return new LecturerFamilyResource($data);
    }

    public function update(Request $request, $id)
    {
        $data = LecturerFamily::findOrFail($id);
        $data->update($request->all());
        return new LecturerFamilyResource($data);
    }

    public function destroy($id)
    {
        $data = LecturerFamily::findOrFail($id);
        $data->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Data berhasil dihapus'
        ], 200);
    }
}
