<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\SpeakerResource;
use App\Models\Speaker;

class SpeakerController extends Controller
{
    public function index()
    {
        $data = Speaker::all();
        return SpeakerResource::collection($data);
    }

    public function store(Request $request)
    {
        $data = Speaker::create($request->all());
        return new SpeakerResource($data);
    }

    public function show($id)
    {
        $data = Speaker::findOrFail($id);
        return new SpeakerResource($data);
    }

    public function update(Request $request, $id)
    {
        $data = Speaker::findOrFail($id);
        $data->update($request->all());
        return new SpeakerResource($data);
    }

    public function destroy($id)
    {
        $data = Speaker::findOrFail($id);
        $data->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Data berhasil dihapus'
        ], 200);
    }
}
