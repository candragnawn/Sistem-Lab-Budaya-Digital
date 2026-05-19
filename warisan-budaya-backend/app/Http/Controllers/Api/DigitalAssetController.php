<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\DigitalAsset;

class DigitalAssetController extends Controller
{
    public function index()
    {
        $data = DigitalAsset::all();
        
        return response()->json([
            'success' => true,
            'message' => 'Daftar Digital Asset',
            'data' => $data
        ], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
        ]);

        $data = DigitalAsset::create($request->all());
        
        return response()->json([
            'success' => true,
            'message' => 'Digital Asset berhasil ditambahkan',
            'data' => $data
        ], 201);
    }

    public function show($id)
    {
        $data = DigitalAsset::findOrFail($id);
        
        return response()->json([
            'success' => true,
            'message' => 'Detail Digital Asset',
            'data' => $data
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $data = DigitalAsset::findOrFail($id);
        $data->update($request->all());
        
        return response()->json([
            'success' => true,
            'message' => 'Digital Asset berhasil diperbarui',
            'data' => $data
        ], 200);
    }

    public function destroy($id)
    {
        $data = DigitalAsset::findOrFail($id);
        $data->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Digital Asset berhasil dihapus'
        ], 200);
    }
}
