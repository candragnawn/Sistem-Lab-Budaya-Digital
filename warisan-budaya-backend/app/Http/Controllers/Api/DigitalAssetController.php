<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\DigitalAssetResource;
use App\Models\DigitalAsset;

class DigitalAssetController extends Controller
{
    public function index()
    {
        $data = DigitalAsset::all();
        return DigitalAssetResource::collection($data);
    }

    public function store(Request $request)
    {
        $data = DigitalAsset::create($request->all());
        return new DigitalAssetResource($data);
    }

    public function show($id)
    {
        $data = DigitalAsset::findOrFail($id);
        return new DigitalAssetResource($data);
    }

    public function update(Request $request, $id)
    {
        $data = DigitalAsset::findOrFail($id);
        $data->update($request->all());
        return new DigitalAssetResource($data);
    }

    public function destroy($id)
    {
        $data = DigitalAsset::findOrFail($id);
        $data->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Data berhasil dihapus'
        ], 200);
    }
}
