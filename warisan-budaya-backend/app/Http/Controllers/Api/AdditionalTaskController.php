<?php

namespace App\Http\Controllers\Api;

use App\Models\PelaksanaanPendidikan\AdditionalTask;
use App\Http\Requests\PelaksanaanPendidikan\StoreAdditionalTaskRequest;
use App\Http\Requests\PelaksanaanPendidikan\UpdateAdditionalTaskRequest;
use App\Http\Resources\AdditionalTaskResource;

class AdditionalTaskController extends BaseCrudController
{
    protected $model = AdditionalTask::class;
    protected $resource = AdditionalTaskResource::class;
    protected $storeRequest = StoreAdditionalTaskRequest::class;
    protected $updateRequest = UpdateAdditionalTaskRequest::class;
    protected $with = ['lecturer'];
}
