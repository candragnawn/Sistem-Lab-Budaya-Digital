<?php

namespace App\Http\Controllers\Api;

class TeachingController extends BaseCrudController
{
    protected $model = \App\Models\Academic\LecturerTeaching::class;

    protected $resource = \App\Http\Resources\Academic\LecturerTeachingResource::class;

    protected $storeRequest = \App\Http\Requests\Academic\StoreLecturerTeachingRequest::class;

    protected $updateRequest = \App\Http\Requests\Academic\UpdateLecturerTeachingRequest::class;
}
