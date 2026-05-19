<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\AwardResource;
use App\Models\Award;

class AwardController extends Controller
{
    public function index()
    {
        $data = Award::all();
        return AwardResource::collection($data);
    }

    public function store(Request $request)
    {
        $data = Award::create($request->all());
        return new AwardResource($data);
    }

    public function show($id)
    {
        $data = Award::findOrFail($id);
        return new AwardResource($data);
    }

    public function update(Request $request, $id)
    {
        $data = Award::findOrFail($id);
        $data->update($request->all());
        return new AwardResource($data);
    }

    public function destroy($id)
    {
        $data = Award::findOrFail($id);
        $data->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Data berhasil dihapus'
        ], 200);
    }
}
