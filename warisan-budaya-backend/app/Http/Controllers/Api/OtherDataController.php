<?php

namespace App\Http\Controllers\Api;


use App\Models\Profile\OtherData;
use App\Http\Requests\Profile\StoreOtherDataRequest;
use App\Http\Requests\Profile\UpdateOtherDataRequest;
use App\Http\Resources\Profile\OtherDataResource;

class OtherDataController extends BaseCrudController
{
    protected $model = OtherData::class;
    protected $resource = OtherDataResource::class;
    protected $storeRequest = StoreOtherDataRequest::class;
    protected $updateRequest = UpdateOtherDataRequest::class;
    protected $with = ['lecturer'];
}
