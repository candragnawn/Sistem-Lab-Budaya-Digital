<?php

namespace App\Http\Controllers\Api;


use App\Models\Profile\LecturerStat;
use App\Http\Requests\Profile\StoreLecturerStatRequest;
use App\Http\Requests\Profile\UpdateLecturerStatRequest;
use App\Http\Resources\Profile\LecturerStatResource;

class LecturerStatController extends BaseCrudController
{
    protected $model = LecturerStat::class;
    protected $resource = LecturerStatResource::class;
    protected $storeRequest = StoreLecturerStatRequest::class;
    protected $updateRequest = UpdateLecturerStatRequest::class;
    protected $with = ['lecturer'];
}
