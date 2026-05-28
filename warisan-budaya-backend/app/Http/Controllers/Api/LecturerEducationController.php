<?php

namespace App\Http\Controllers\Api;

use App\Http\Requests\Academic\StoreLecturerEducationRequest;
use App\Models\Academic\LecturerEducation;
use Illuminate\Http\Request;
use App\Http\Resources\LecturerEducationResource;

class LecturerEducationController extends BaseCrudController
{
    protected $model = LecturerEducation::class;

    protected $storeRequest = "App\Http\Requests\Academic\StoreLecturerEducationRequest";
    
    protected $updateRequest = "App\Http\Requests\Academic\UpdateLecturerEducationRequest";

    protected $resource = "App\Http\Resources\Academic\LecturerEducationResource";
}
