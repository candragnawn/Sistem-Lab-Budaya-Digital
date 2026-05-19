<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\CommunityServiceResource;
use App\Models\CommunityService;

class CommunityServiceController extends Controller
{
    public function index()
    {
        $data = CommunityService::all();
        return CommunityServiceResource::collection($data);
    }

    public function store(Request $request)
    {
        $data = CommunityService::create($request->all());
        return new CommunityServiceResource($data);
    }

    public function show($id)
    {
        $data = CommunityService::findOrFail($id);
        return new CommunityServiceResource($data);
    }

    public function update(Request $request, $id)
    {
        $data = CommunityService::findOrFail($id);
        $data->update($request->all());
        return new CommunityServiceResource($data);
    }

    public function destroy($id)
    {
        $data = CommunityService::findOrFail($id);
        $data->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Data berhasil dihapus'
        ], 200);
    }
}
