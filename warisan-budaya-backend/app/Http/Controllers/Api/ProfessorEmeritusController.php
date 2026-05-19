<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\ProfessorEmeritusResource;
use App\Models\ProfessorEmeritus;

class ProfessorEmeritusController extends Controller
{
    public function index()
    {
        $data = ProfessorEmeritus::all();
        return ProfessorEmeritusResource::collection($data);
    }

    public function store(Request $request)
    {
        $data = ProfessorEmeritus::create($request->all());
        return new ProfessorEmeritusResource($data);
    }

    public function show($id)
    {
        $data = ProfessorEmeritus::findOrFail($id);
        return new ProfessorEmeritusResource($data);
    }

    public function update(Request $request, $id)
    {
        $data = ProfessorEmeritus::findOrFail($id);
        $data->update($request->all());
        return new ProfessorEmeritusResource($data);
    }

    public function destroy($id)
    {
        $data = ProfessorEmeritus::findOrFail($id);
        $data->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Data berhasil dihapus'
        ], 200);
    }
}
