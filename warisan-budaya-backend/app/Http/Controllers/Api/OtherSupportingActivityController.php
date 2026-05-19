<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\OtherSupportingActivityResource;
use App\Models\OtherSupportingActivity;

class OtherSupportingActivityController extends Controller
{
    public function index()
    {
        $data = OtherSupportingActivity::all();
        return OtherSupportingActivityResource::collection($data);
    }

    public function store(Request $request)
    {
        $data = OtherSupportingActivity::create($request->all());
        return new OtherSupportingActivityResource($data);
    }

    public function show($id)
    {
        $data = OtherSupportingActivity::findOrFail($id);
        return new OtherSupportingActivityResource($data);
    }

    public function update(Request $request, $id)
    {
        $data = OtherSupportingActivity::findOrFail($id);
        $data->update($request->all());
        return new OtherSupportingActivityResource($data);
    }

    public function destroy($id)
    {
        $data = OtherSupportingActivity::findOrFail($id);
        $data->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Data berhasil dihapus'
        ], 200);
    }
}
