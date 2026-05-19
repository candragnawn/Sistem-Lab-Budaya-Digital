<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class TeachingController extends Controller
{
    public function index()
    {
        return response()->json([
            'success' => true,
            'message' => 'Daftar data',
            'data' => []
        ], 200);
    }

    public function store(Request $request)
    {
        return response()->json([
            'success' => true,
            'message' => 'Data berhasil ditambahkan',
            'data' => []
        ], 201);
    }

    public function show($id)
    {
        return response()->json([
            'success' => true,
            'message' => 'Detail data',
            'data' => []
        ], 200);
    }

    public function update(Request $request, $id)
    {
        return response()->json([
            'success' => true,
            'message' => 'Data berhasil diperbarui',
            'data' => []
        ], 200);
    }

    public function destroy($id)
    {
        return response()->json([
            'success' => true,
            'message' => 'Data berhasil dihapus'
        ], 200);
    }
}
