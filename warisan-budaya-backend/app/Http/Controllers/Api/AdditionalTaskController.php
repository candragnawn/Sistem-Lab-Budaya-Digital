<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\AdditionalTaskResource;
use App\Models\AdditionalTask;

class AdditionalTaskController extends Controller
{
    public function index()
    {
        $data = AdditionalTask::all();
        return AdditionalTaskResource::collection($data);
    }

    public function store(Request $request)
    {
        $data = AdditionalTask::create($request->all());
        return new AdditionalTaskResource($data);
    }

    public function show($id)
    {
        $data = AdditionalTask::findOrFail($id);
        return new AdditionalTaskResource($data);
    }

    public function update(Request $request, $id)
    {
        $data = AdditionalTask::findOrFail($id);
        $data->update($request->all());
        return new AdditionalTaskResource($data);
    }

    public function destroy($id)
    {
        $data = AdditionalTask::findOrFail($id);
        $data->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Data berhasil dihapus'
        ], 200);
    }
}
