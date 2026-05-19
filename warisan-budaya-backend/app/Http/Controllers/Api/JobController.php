<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\JobResource;
use App\Models\Job;

class JobController extends Controller
{
    public function index()
    {
        $data = Job::all();
        return JobResource::collection($data);
    }

    public function store(Request $request)
    {
        $data = Job::create($request->all());
        return new JobResource($data);
    }

    public function show($id)
    {
        $data = Job::findOrFail($id);
        return new JobResource($data);
    }

    public function update(Request $request, $id)
    {
        $data = Job::findOrFail($id);
        $data->update($request->all());
        return new JobResource($data);
    }

    public function destroy($id)
    {
        $data = Job::findOrFail($id);
        $data->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Data berhasil dihapus'
        ], 200);
    }
}
