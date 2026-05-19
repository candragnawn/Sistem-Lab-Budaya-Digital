<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Publication;

class PublicationController extends Controller
{
    public function index()
    {
        $data = Publication::all();
        
        return response()->json([
            'success' => true,
            'message' => 'Daftar Publication',
            'data' => $data
        ], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
        ]);

        $data = Publication::create($request->all());
        
        return response()->json([
            'success' => true,
            'message' => 'Publication berhasil ditambahkan',
            'data' => $data
        ], 201);
    }

    public function show($id)
    {
        $data = Publication::findOrFail($id);
        
        return response()->json([
            'success' => true,
            'message' => 'Detail Publication',
            'data' => $data
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $data = Publication::findOrFail($id);
        $data->update($request->all());
        
        return response()->json([
            'success' => true,
            'message' => 'Publication berhasil diperbarui',
            'data' => $data
        ], 200);
    }

    public function destroy($id)
    {
        $data = Publication::findOrFail($id);
        $data->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Publication berhasil dihapus'
        ], 200);
    }
}
