<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\HKIResource;
use App\Models\HKI;

class HKIController extends Controller
{
    public function index()
    {
        $data = HKI::all();
        return HKIResource::collection($data);
    }

    public function store(Request $request)
    {
        $data = HKI::create($request->all());
        return new HKIResource($data);
    }

    public function show($id)
    {
        $data = HKI::findOrFail($id);
        return new HKIResource($data);
    }

    public function update(Request $request, $id)
    {
        $data = HKI::findOrFail($id);
        $data->update($request->all());
        return new HKIResource($data);
    }

    public function destroy($id)
    {
        $data = HKI::findOrFail($id);
        $data->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Data berhasil dihapus'
        ], 200);
    }
}
