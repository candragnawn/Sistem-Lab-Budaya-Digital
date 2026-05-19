<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Research;

class ResearchController extends Controller
{
    public function index()
    {
        $data = Research::all();
        
        return response()->json([
            'success' => true,
            'message' => 'Daftar Research',
            'data' => $data
        ], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
        ]);

        $data = Research::create($request->all());
        
        return response()->json([
            'success' => true,
            'message' => 'Research berhasil ditambahkan',
            'data' => $data
        ], 201);
    }

    public function show($id)
    {
        $data = Research::findOrFail($id);
        
        return response()->json([
            'success' => true,
            'message' => 'Detail Research',
            'data' => $data
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $data = Research::findOrFail($id);
        $data->update($request->all());
        
        return response()->json([
            'success' => true,
            'message' => 'Research berhasil diperbarui',
            'data' => $data
        ], 200);
    }

    public function destroy($id)
    {
        $data = Research::findOrFail($id);
        $data->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Research berhasil dihapus'
        ], 200);
    }
}
