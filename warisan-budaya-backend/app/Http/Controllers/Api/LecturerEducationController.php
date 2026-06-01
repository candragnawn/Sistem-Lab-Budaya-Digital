<?php

namespace App\Http\Controllers\Api;

use App\Models\Kualifikasi\LecturerEducation;
use App\Http\Requests\Academic\StoreLecturerEducationRequest;
use App\Http\Requests\Academic\UpdateLecturerEducationRequest;
use App\Http\Resources\Academic\LecturerEducationResource;

class LecturerEducationController extends BaseCrudController
{
    protected $model = LecturerEducation::class;
    protected $resource = LecturerEducationResource::class;
    protected $storeRequest = StoreLecturerEducationRequest::class;
    protected $updateRequest = UpdateLecturerEducationRequest::class;
    protected $with = ['lecturer'];
}
