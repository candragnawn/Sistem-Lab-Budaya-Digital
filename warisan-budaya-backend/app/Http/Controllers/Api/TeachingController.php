<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\TeachingResource;
use App\Models\Teaching;

class TeachingController extends Controller
{
    public function index()
    {
        $data = Teaching::all();
        return TeachingResource::collection($data);
    }

    public function store(Request $request)
    {
        $data = Teaching::create($request->all());
        return new TeachingResource($data);
    }

    public function show($id)
    {
        $data = Teaching::findOrFail($id);
        return new TeachingResource($data);
    }

    public function update(Request $request, $id)
    {
        $data = Teaching::findOrFail($id);
        $data->update($request->all());
        return new TeachingResource($data);
    }

    public function destroy($id)
    {
        $data = Teaching::findOrFail($id);
        $data->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Data berhasil dihapus'
        ], 200);
    }
}
