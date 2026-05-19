<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Kompetensi\test; 

class TestController extends Controller
{
    public function index()
    {
        $data = test::all();
        
        return response()->json([
            'success' => true,
            'message' => 'Daftar Test',
            'data' => $data
        ], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'lecturer_id' => 'required|integer',
            'test_name' => 'required|string|max:255',
        ]);

        $data = test::create($request->all());
        
        return response()->json([
            'success' => true,
            'message' => 'Test berhasil ditambahkan',
            'data' => $data
        ], 201);
    }

    public function show($id)
    {
        $data = test::findOrFail($id);
        
        return response()->json([
            'success' => true,
            'message' => 'Detail Test',
            'data' => $data
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $data = test::findOrFail($id);
        $data->update($request->all());
        
        return response()->json([
            'success' => true,
            'message' => 'Test berhasil diperbarui',
            'data' => $data
        ], 200);
    }

    public function destroy($id)
    {
        $data = test::findOrFail($id);
        $data->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Test berhasil dihapus'
        ], 200);
    }
}
