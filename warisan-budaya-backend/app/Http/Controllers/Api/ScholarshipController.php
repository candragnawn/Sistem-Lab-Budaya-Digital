<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\ScholarshipResource;
use App\Models\Scholarship;

class ScholarshipController extends Controller
{
    public function index()
    {
        $data = Scholarship::all();
        return ScholarshipResource::collection($data);
    }

    public function store(Request $request)
    {
        $data = Scholarship::create($request->all());
        return new ScholarshipResource($data);
    }

    public function show($id)
    {
        $data = Scholarship::findOrFail($id);
        return new ScholarshipResource($data);
    }

    public function update(Request $request, $id)
    {
        $data = Scholarship::findOrFail($id);
        $data->update($request->all());
        return new ScholarshipResource($data);
    }

    public function destroy($id)
    {
        $data = Scholarship::findOrFail($id);
        $data->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Data berhasil dihapus'
        ], 200);
    }
}
