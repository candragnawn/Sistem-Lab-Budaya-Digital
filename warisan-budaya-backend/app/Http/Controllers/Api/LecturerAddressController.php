<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\LecturerAddressResource;
use App\Models\LecturerAddress;

class LecturerAddressController extends Controller
{
    public function index()
    {
        $data = LecturerAddress::all();
        return LecturerAddressResource::collection($data);
    }

    public function store(Request $request)
    {
        $data = LecturerAddress::create($request->all());
        return new LecturerAddressResource($data);
    }

    public function show($id)
    {
        $data = LecturerAddress::findOrFail($id);
        return new LecturerAddressResource($data);
    }

    public function update(Request $request, $id)
    {
        $data = LecturerAddress::findOrFail($id);
        $data->update($request->all());
        return new LecturerAddressResource($data);
    }

    public function destroy($id)
    {
        $data = LecturerAddress::findOrFail($id);
        $data->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Data berhasil dihapus'
        ], 200);
    }
}
