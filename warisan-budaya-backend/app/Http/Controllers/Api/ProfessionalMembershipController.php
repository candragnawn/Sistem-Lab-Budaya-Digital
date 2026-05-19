<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\ProfessionalMembershipResource;
use App\Models\ProfessionalMembership;

class ProfessionalMembershipController extends Controller
{
    public function index()
    {
        $data = ProfessionalMembership::all();
        return ProfessionalMembershipResource::collection($data);
    }

    public function store(Request $request)
    {
        $data = ProfessionalMembership::create($request->all());
        return new ProfessionalMembershipResource($data);
    }

    public function show($id)
    {
        $data = ProfessionalMembership::findOrFail($id);
        return new ProfessionalMembershipResource($data);
    }

    public function update(Request $request, $id)
    {
        $data = ProfessionalMembership::findOrFail($id);
        $data->update($request->all());
        return new ProfessionalMembershipResource($data);
    }

    public function destroy($id)
    {
        $data = ProfessionalMembership::findOrFail($id);
        $data->delete();
        
        return response()->json([
            'success' => true,
            'message' => 'Data berhasil dihapus'
        ], 200);
    }
}
