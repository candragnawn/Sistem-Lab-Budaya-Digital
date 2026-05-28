<?php

namespace App\Http\Controllers\Api;


use App\Models\Academic\LecturerTeaching;
use App\Http\Requests\Academic\StoreLecturerTeachingRequest;
use App\Http\Requests\Academic\UpdateLecturerTeachingRequest;
use App\Http\Resources\Academic\LecturerTeachingResource;

class LecturerTeachingController extends BaseCrudController
{
    protected $model = LecturerTeaching::class;
    protected $resource = LecturerTeachingResource::class;
    protected $storeRequest = StoreLecturerTeachingRequest::class;
    protected $updateRequest = UpdateLecturerTeachingRequest::class;
    protected $with = ['lecturer'];
}
