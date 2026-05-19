<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\JournalManagerResource;
use App\Models\JournalManager;

class JournalManagerController extends Controller
{
    public function index()
    {
        $data = JournalManager::all();
        return JournalManagerResource::collection($data);
    }

    public function store(Request $request)
    {
        $data = JournalManager::create($request->all());
        return new JournalManagerResource($data);
    }

    public function show($id)
    {
        $data = JournalManager::findOrFail($id);
        return new JournalManagerResource($data);
    }

    public function update(Request $request, $id)
    {
        $data = JournalManager::findOrFail($id);
        $data->update($request->all());
        return new JournalManagerResource($data);
    }

    public function destroy($id)
    {
        $data = JournalManager::findOrFail($id);
        $data->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Data berhasil dihapus'
        ], 200);
    }
}
