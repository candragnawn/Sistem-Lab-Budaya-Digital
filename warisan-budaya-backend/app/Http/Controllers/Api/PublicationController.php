<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\PublicationResource;
use App\Models\Publication;

class PublicationController extends Controller
{
    public function index()
    {
        $data = Publication::all();
        return PublicationResource::collection($data);
    }

    public function store(Request $request)
    {
        $data = Publication::create($request->all());
        return new PublicationResource($data);
    }

    public function show($id)
    {
        $data = Publication::findOrFail($id);
        return new PublicationResource($data);
    }

    public function update(Request $request, $id)
    {
        $data = Publication::findOrFail($id);
        $data->update($request->all());
        return new PublicationResource($data);
    }

    public function destroy($id)
    {
        $data = Publication::findOrFail($id);
        $data->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Data berhasil dihapus'
        ], 200);
    }
}
