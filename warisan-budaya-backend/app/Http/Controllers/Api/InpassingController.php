<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\InpassingResource;
use App\Models\Inpassing;

class InpassingController extends Controller
{
    public function index()
    {
        $data = Inpassing::all();
        return InpassingResource::collection($data);
    }

    public function store(Request $request)
    {
        $data = Inpassing::create($request->all());
        return new InpassingResource($data);
    }

    public function show($id)
    {
        $data = Inpassing::findOrFail($id);
        return new InpassingResource($data);
    }

    public function update(Request $request, $id)
    {
        $data = Inpassing::findOrFail($id);
        $data->update($request->all());
        return new InpassingResource($data);
    }

    public function destroy($id)
    {
        $data = Inpassing::findOrFail($id);
        $data->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Data berhasil dihapus'
        ], 200);
    }
}
