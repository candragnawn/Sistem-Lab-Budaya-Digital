<?php

namespace App\Http\Controllers\Api;


use App\Models\Academic\LecturerStudy;
use App\Http\Requests\Academic\StoreLecturerStudyRequest;
use App\Http\Requests\Academic\UpdateLecturerStudyRequest;
use App\Http\Resources\Academic\LecturerStudyResource;

class LecturerStudyController extends BaseCrudController
{
    protected $model = LecturerStudy::class;
    protected $resource = LecturerStudyResource::class;
    protected $storeRequest = StoreLecturerStudyRequest::class;
    protected $updateRequest = UpdateLecturerStudyRequest::class;
    protected $with = ['lecturer'];
}
