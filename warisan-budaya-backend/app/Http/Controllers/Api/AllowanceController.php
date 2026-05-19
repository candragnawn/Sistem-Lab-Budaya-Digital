<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\AllowanceResource;
use App\Models\Allowance;

class AllowanceController extends Controller
{
    public function index()
    {
        $data = Allowance::all();
        return AllowanceResource::collection($data);
    }

    public function store(Request $request)
    {
        $data = Allowance::create($request->all());
        return new AllowanceResource($data);
    }

    public function show($id)
    {
        $data = Allowance::findOrFail($id);
        return new AllowanceResource($data);
    }

    public function update(Request $request, $id)
    {
        $data = Allowance::findOrFail($id);
        $data->update($request->all());
        return new AllowanceResource($data);
    }

    public function destroy($id)
    {
        $data = Allowance::findOrFail($id);
        $data->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Data berhasil dihapus'
        ], 200);
    }
}
