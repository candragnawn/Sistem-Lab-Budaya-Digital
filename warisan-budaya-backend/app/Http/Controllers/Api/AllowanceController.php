<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Reward\Allowance;

class AllowanceController extends Controller
{
    public function index()
    {
        $data = Allowance::all();
        
        return response()->json([
            'success' => true,
            'message' => 'Daftar Allowance',
            'data' => $data
        ], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'lecturer_id' => 'required|integer',
            'allowance_type' => 'required|string|max:255',
        ]);

        $data = Allowance::create($request->all());
        
        return response()->json([
            'success' => true,
            'message' => 'Allowance berhasil ditambahkan',
            'data' => $data
        ], 201);
    }

    public function show($id)
    {
        $data = Allowance::findOrFail($id);
        
        return response()->json([
            'success' => true,
            'message' => 'Detail Allowance',
            'data' => $data
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $data = Allowance::findOrFail($id);
        $data->update($request->all());
        
        return response()->json([
            'success' => true,
            'message' => 'Allowance berhasil diperbarui',
            'data' => $data
        ], 200);
    }

    public function destroy($id)
    {
        $data = Allowance::findOrFail($id);
        $data->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Allowance berhasil dihapus'
        ], 200);
    }
}
