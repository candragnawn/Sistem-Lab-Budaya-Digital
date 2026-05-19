<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\ResearchResource;
use App\Models\Research;

class ResearchController extends Controller
{
    public function index()
    {
        $data = Research::all();
        return ResearchResource::collection($data);
    }

    public function store(Request $request)
    {
        $data = Research::create($request->all());
        return new ResearchResource($data);
    }

    public function show($id)
    {
        $data = Research::findOrFail($id);
        return new ResearchResource($data);
    }

    public function update(Request $request, $id)
    {
        $data = Research::findOrFail($id);
        $data->update($request->all());
        return new ResearchResource($data);
    }

    public function destroy($id)
    {
        $data = Research::findOrFail($id);
        $data->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Data berhasil dihapus'
        ], 200);
    }
}
