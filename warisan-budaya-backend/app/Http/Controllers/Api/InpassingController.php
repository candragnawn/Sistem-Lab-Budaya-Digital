<?php

namespace App\Http\Controllers\Api;

use App\Models\Profile\Inpassing;
use App\Http\Requests\Profile\StoreInpassingRequest;
use App\Http\Requests\Profile\UpdateInpassingRequest;
use App\Http\Resources\InpassingResource;

class InpassingController extends BaseCrudController
{
    protected $model = Inpassing::class;
    protected $resource = InpassingResource::class;
    protected $storeRequest = StoreInpassingRequest::class;
    protected $updateRequest = UpdateInpassingRequest::class;
    protected $with = ['lecturer'];
}
