<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\FunctionalPositionResource;
use App\Models\FunctionalPosition;

class FunctionalPositionController extends Controller
{
    public function index()
    {
        $data = FunctionalPosition::all();
        return FunctionalPositionResource::collection($data);
    }

    public function store(Request $request)
    {
        $data = FunctionalPosition::create($request->all());
        return new FunctionalPositionResource($data);
    }

    public function show($id)
    {
        $data = FunctionalPosition::findOrFail($id);
        return new FunctionalPositionResource($data);
    }

    public function update(Request $request, $id)
    {
        $data = FunctionalPosition::findOrFail($id);
        $data->update($request->all());
        return new FunctionalPositionResource($data);
    }

    public function destroy($id)
    {
        $data = FunctionalPosition::findOrFail($id);
        $data->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Data berhasil dihapus'
        ], 200);
    }
}
