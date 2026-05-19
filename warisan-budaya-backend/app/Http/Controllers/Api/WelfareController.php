<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\WelfareResource;
use App\Models\Welfare;

class WelfareController extends Controller
{
    public function index()
    {
        $data = Welfare::all();
        return WelfareResource::collection($data);
    }

    public function store(Request $request)
    {
        $data = Welfare::create($request->all());
        return new WelfareResource($data);
    }

    public function show($id)
    {
        $data = Welfare::findOrFail($id);
        return new WelfareResource($data);
    }

    public function update(Request $request, $id)
    {
        $data = Welfare::findOrFail($id);
        $data->update($request->all());
        return new WelfareResource($data);
    }

    public function destroy($id)
    {
        $data = Welfare::findOrFail($id);
        $data->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Data berhasil dihapus'
        ], 200);
    }
}
