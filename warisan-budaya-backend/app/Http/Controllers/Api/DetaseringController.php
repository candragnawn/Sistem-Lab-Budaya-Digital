<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\DetaseringResource;
use App\Models\Detasering;

class DetaseringController extends Controller
{
    public function index()
    {
        $data = Detasering::all();
        return DetaseringResource::collection($data);
    }

    public function store(Request $request)
    {
        $data = Detasering::create($request->all());
        return new DetaseringResource($data);
    }

    public function show($id)
    {
        $data = Detasering::findOrFail($id);
        return new DetaseringResource($data);
    }

    public function update(Request $request, $id)
    {
        $data = Detasering::findOrFail($id);
        $data->update($request->all());
        return new DetaseringResource($data);
    }

    public function destroy($id)
    {
        $data = Detasering::findOrFail($id);
        $data->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Data berhasil dihapus'
        ], 200);
    }
}
