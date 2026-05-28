<?php

namespace App\Http\Controllers\Api;


use App\Models\WorkContract;
use App\Http\Requests\Profile\StoreWorkContractRequest;
use App\Http\Requests\Profile\UpdateWorkContractRequest;
use App\Http\Resources\WorkContractResource;

class WorkContractController extends BaseCrudController
{
    protected $model = WorkContract::class;
    protected $resource = WorkContractResource::class;
    protected $storeRequest = StoreWorkContractRequest::class;
    protected $updateRequest = UpdateWorkContractRequest::class;
    protected $with = ['lecturer'];
}
