<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\LecturerIdentityResource;
use App\Models\LecturerIdentity;

class LecturerIdentityController extends Controller
{
    public function index()
    {
        $data = LecturerIdentity::all();
        return LecturerIdentityResource::collection($data);
    }

    public function store(Request $request)
    {
        $data = LecturerIdentity::create($request->all());
        return new LecturerIdentityResource($data);
    }

    public function show($id)
    {
        $data = LecturerIdentity::findOrFail($id);
        return new LecturerIdentityResource($data);
    }

    public function update(Request $request, $id)
    {
        $data = LecturerIdentity::findOrFail($id);
        $data->update($request->all());
        return new LecturerIdentityResource($data);
    }

    public function destroy($id)
    {
        $data = LecturerIdentity::findOrFail($id);
        $data->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Data berhasil dihapus'
        ], 200);
    }
}
