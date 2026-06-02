<?php

namespace App\Http\Controllers\Api;

use App\Models\Lecturer;
use App\Http\Requests\Master\StoreLecturerRequest;
use App\Http\Requests\Master\UpdateLecturerRequest;
use App\Http\Resources\Master\LecturerResource;

class LecturerController extends BaseCrudController
{
    protected $model = Lecturer::class;
    protected $resource = LecturerResource::class;
    protected $storeRequest = StoreLecturerRequest::class;
    protected $updateRequest = UpdateLecturerRequest::class;
    protected $with = [];


}
