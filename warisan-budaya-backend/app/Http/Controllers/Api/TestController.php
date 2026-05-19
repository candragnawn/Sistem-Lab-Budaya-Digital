<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\TestResource;
use App\Models\Test;

class TestController extends Controller
{
    public function index()
    {
        $data = Test::all();
        return TestResource::collection($data);
    }

    public function store(Request $request)
    {
        $data = Test::create($request->all());
        return new TestResource($data);
    }

    public function show($id)
    {
        $data = Test::findOrFail($id);
        return new TestResource($data);
    }

    public function update(Request $request, $id)
    {
        $data = Test::findOrFail($id);
        $data->update($request->all());
        return new TestResource($data);
    }

    public function destroy($id)
    {
        $data = Test::findOrFail($id);
        $data->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Data berhasil dihapus'
        ], 200);
    }
}
