<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Job;

class JobController extends Controller
{
    public function index()
    {
        $data = Job::all();
        
        return response()->json([
            'success' => true,
            'message' => 'Daftar Job',
            'data' => $data
        ], 200);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
        ]);

        $data = Job::create($request->all());
        
        return response()->json([
            'success' => true,
            'message' => 'Job berhasil ditambahkan',
            'data' => $data
        ], 201);
    }

    public function show($id)
    {
        $data = Job::findOrFail($id);
        
        return response()->json([
            'success' => true,
            'message' => 'Detail Job',
            'data' => $data
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $data = Job::findOrFail($id);
        $data->update($request->all());
        
        return response()->json([
            'success' => true,
            'message' => 'Job berhasil diperbarui',
            'data' => $data
        ], 200);
    }

    public function destroy($id)
    {
        $data = Job::findOrFail($id);
        $data->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Job berhasil dihapus'
        ], 200);
    }
}
