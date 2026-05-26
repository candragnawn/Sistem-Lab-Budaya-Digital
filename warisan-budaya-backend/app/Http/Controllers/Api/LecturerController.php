<?php

namespace App\Http\Controllers\Api;

use App\Models\Lecturer;
use Illuminate\Http\Request;
use App\Http\Resources\LecturerResource;

class LecturerController extends BaseCrudController
{
    protected $model = Lecturer::class;

    public function index()
    {
        //pake pagination cok biar gak penuh ramnya
       $lecturers = Lecturer::paginate(10);
       return LecturerResource::collection($lecturers);

    }

    public function show($id)
    {
        $lecturer = Lecturer::with([
            'education', 
            'ranks', 
            'studies', 
            'positions', 
            'workContracts', 
            'teachings', 
            'publications'
        ])->findOrFail($id);

        return new LecturerResource($lecturer);
    }

    public function create(Request $request){
        
    }
}
