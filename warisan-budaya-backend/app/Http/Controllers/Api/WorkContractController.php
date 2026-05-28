<?php

namespace App\Http\Controllers\Api;


use App\Models\Profile\WorkContract;
use App\Http\Requests\Profile\StoreWorkContractRequest;
use App\Http\Requests\Profile\UpdateWorkContractRequest;
use App\Http\Resources\Profile\WorkContractResource;

class WorkContractController extends BaseCrudController
{
    protected $model = WorkContract::class;
    protected $resource = WorkContractResource::class;
    protected $storeRequest = StoreWorkContractRequest::class;
    protected $updateRequest = UpdateWorkContractRequest::class;
    protected $with = ['lecturer'];
}
