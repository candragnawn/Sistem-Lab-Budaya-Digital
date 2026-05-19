<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Penunjang\Award;

class AwardController extends Controller
{
    public function index()
    {
        $data = Award::all();
        
        return response()->json([
            'success' => true,
            'message' => 'Daftar Award',
            'data' => $data
        ], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'lecturer_id' => 'required|integer',
            'award_name' => 'required|string|max:255',
        ]);

        $data = Award::create($request->all());
        
        return response()->json([
            'success' => true,
            'message' => 'Award berhasil ditambahkan',
            'data' => $data
        ], 201);
    }

    public function show($id)
    {
        $data = Award::findOrFail($id);
        
        return response()->json([
            'success' => true,
            'message' => 'Detail Award',
            'data' => $data
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $data = Award::findOrFail($id);
        $data->update($request->all());
        
        return response()->json([
            'success' => true,
            'message' => 'Award berhasil diperbarui',
            'data' => $data
        ], 200);
    }

    public function destroy($id)
    {
        $data = Award::findOrFail($id);
        $data->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Award berhasil dihapus'
        ], 200);
    }
}
