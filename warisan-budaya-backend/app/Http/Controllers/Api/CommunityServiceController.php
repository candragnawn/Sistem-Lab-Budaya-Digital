<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CommunityService;

class CommunityServiceController extends Controller
{
    public function index()
    {
        $data = CommunityService::all();
        
        return response()->json([
            'success' => true,
            'message' => 'Daftar Community Service',
            'data' => $data
        ], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
        ]);

        $data = CommunityService::create($request->all());
        
        return response()->json([
            'success' => true,
            'message' => 'Community Service berhasil ditambahkan',
            'data' => $data
        ], 201);
    }

    public function show($id)
    {
        $data = CommunityService::findOrFail($id);
        
        return response()->json([
            'success' => true,
            'message' => 'Detail Community Service',
            'data' => $data
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $data = CommunityService::findOrFail($id);
        $data->update($request->all());
        
        return response()->json([
            'success' => true,
            'message' => 'Community Service berhasil diperbarui',
            'data' => $data
        ], 200);
    }

    public function destroy($id)
    {
        $data = CommunityService::findOrFail($id);
        $data->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Community Service berhasil dihapus'
        ], 200);
    }
}
