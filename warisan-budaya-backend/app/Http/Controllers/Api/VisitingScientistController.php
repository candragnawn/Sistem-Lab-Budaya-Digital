<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\VisitingScientistResource;
use App\Models\VisitingScientist;

class VisitingScientistController extends Controller
{
    public function index()
    {
        $data = VisitingScientist::all();
        return VisitingScientistResource::collection($data);
    }

    public function store(Request $request)
    {
        $data = VisitingScientist::create($request->all());
        return new VisitingScientistResource($data);
    }

    public function show($id)
    {
        $data = VisitingScientist::findOrFail($id);
        return new VisitingScientistResource($data);
    }

    public function update(Request $request, $id)
    {
        $data = VisitingScientist::findOrFail($id);
        $data->update($request->all());
        return new VisitingScientistResource($data);
    }

    public function destroy($id)
    {
        $data = VisitingScientist::findOrFail($id);
        $data->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Data berhasil dihapus'
        ], 200);
    }
}
