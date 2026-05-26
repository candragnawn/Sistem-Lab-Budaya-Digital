<?php

namespace App\Http\Controllers\Api;

use App\Models\Lecturer;
use Illuminate\Http\Request;

class LecturerController extends BaseCrudController
{
    protected $model = Lecturer::class;

    public function show($id){
        $lecturers = Lecturer::all();
        return view('data.index', compact('lecturers'));
    }

    public function create(Request $request){
        
    }
}
