<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\DiklatResource;
use App\Models\Diklat;

class DiklatController extends Controller
{
    public function index()
    {
        $data = Diklat::all();
        return DiklatResource::collection($data);
    }

    public function store(Request $request)
    {
        $data = Diklat::create($request->all());
        return new DiklatResource($data);
    }

    public function show($id)
    {
        $data = Diklat::findOrFail($id);
        return new DiklatResource($data);
    }

    public function update(Request $request, $id)
    {
        $data = Diklat::findOrFail($id);
        $data->update($request->all());
        return new DiklatResource($data);
    }

    public function destroy($id)
    {
        $data = Diklat::findOrFail($id);
        $data->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Data berhasil dihapus'
        ], 200);
    }
}
