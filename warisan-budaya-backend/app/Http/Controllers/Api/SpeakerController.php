<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\PelaksanaanPengabdian\Speaker;

class SpeakerController extends Controller
{
    public function index()
    {
        $data = Speaker::all();
        
        return response()->json([
            'success' => true,
            'message' => 'Daftar Speaker',
            'data' => $data
        ], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'lecturer_id' => 'required|integer',
            'activity_name' => 'required|string|max:255',
        ]);

        $data = Speaker::create($request->all());
        
        return response()->json([
            'success' => true,
            'message' => 'Speaker berhasil ditambahkan',
            'data' => $data
        ], 201);
    }

    public function show($id)
    {
        $data = Speaker::findOrFail($id);
        
        return response()->json([
            'success' => true,
            'message' => 'Detail Speaker',
            'data' => $data
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $data = Speaker::findOrFail($id);
        $data->update($request->all());
        
        return response()->json([
            'success' => true,
            'message' => 'Speaker berhasil diperbarui',
            'data' => $data
        ], 200);
    }

    public function destroy($id)
    {
        $data = Speaker::findOrFail($id);
        $data->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Speaker berhasil dihapus'
        ], 200);
    }
}
