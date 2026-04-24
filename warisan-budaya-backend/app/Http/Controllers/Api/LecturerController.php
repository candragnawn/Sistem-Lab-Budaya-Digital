<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Lecturer;
use Illuminate\Http\Request;
use App\Http\Resources\LecturerResource;

class LecturerController extends Controller

{     
    public function index()
    {
        $lecturers = Lecturer::all();
        return LecturerResource::collection($lecturers);    }

    public function show($id)
    {
        $lecturer = Lecturer::with([
        'stats', 
        'publications', 
        'education',
        'ranks',
        'positions',
        'teachings',
        'workContracts'
    ])->findOrFail($id);

        return new LecturerResource($lecturer);
    }
}
