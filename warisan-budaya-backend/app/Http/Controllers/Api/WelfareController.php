<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Reward\Welfare;

class WelfareController extends Controller
{
    public function index()
    {
        $data = Welfare::all();
        
        return response()->json([
            'success' => true,
            'message' => 'Daftar Welfare',
            'data' => $data
        ], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'lecturer_id' => 'required|integer',
            'welfare_type' => 'required|string|max:255',
        ]);

        $data = Welfare::create($request->all());
        
        return response()->json([
            'success' => true,
            'message' => 'Welfare berhasil ditambahkan',
            'data' => $data
        ], 201);
    }

    public function show($id)
    {
        $data = Welfare::findOrFail($id);
        
        return response()->json([
            'success' => true,
            'message' => 'Detail Welfare',
            'data' => $data
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $data = Welfare::findOrFail($id);
        $data->update($request->all());
        
        return response()->json([
            'success' => true,
            'message' => 'Welfare berhasil diperbarui',
            'data' => $data
        ], 200);
    }

    public function destroy($id)
    {
        $data = Welfare::findOrFail($id);
        $data->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Welfare berhasil dihapus'
        ], 200);
    }
}
