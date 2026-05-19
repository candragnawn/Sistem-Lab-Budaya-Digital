<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Profile\Position;

class FunctionalPositionController extends Controller
{
    public function index()
    {
        $data = Position::all();
        return response()->json([
            'success' => true,
            'message' => 'Daftar Functional Position',
            'data' => $data
        ], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'lecturers_id' => 'required|integer',
            'functional_position' => 'required|string|max:255',
            'decree_number' => 'required|string|max:255',
            'decree_date' => 'required|date',
            'effective_date' => 'required|date',
            'civil_servant_status' => 'required|string|max:255',
        ]);

        $data = Position::create($request->all());
        
        return response()->json([
            'success' => true,
            'message' => 'Functional Position berhasil ditambahkan',
            'data' => $data
        ], 201);
    }

    public function show($id)
    {
        $data = Position::findOrFail($id);
        
        return response()->json([
            'success' => true,
            'message' => 'Detail Functional Position',
            'data' => $data
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'functional_position' => 'string|max:255',
            'decree_number' => 'string|max:255',
        ]);

        $data = Position::findOrFail($id);
        $data->update($request->all());
        
        return response()->json([
            'success' => true,
            'message' => 'Functional Position berhasil diperbarui',
            'data' => $data
        ], 200);
    }

    public function destroy($id)
    {
        $data = Position::findOrFail($id);
        $data->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Functional Position berhasil dihapus'
        ], 200);
    }
}
