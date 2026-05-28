<?php

namespace App\Http\Controllers\Api;
use Illuminate\Http\Request;


class LecturerStudyController extends BaseCrudController
{
    protected $model = \App\Models\Academic\LecturerStudy::class;

    protected $storeRequest = \App\Http\Requests\Academic\StoreLecturerStudyRequest::class;

    protected $updateRequest = \App\Http\Requests\Academic\UpdateLecturerStudyRequest::class;

    protected $resource = \App\Http\Resources\Academic\LecturerStudyResource::class;
}
