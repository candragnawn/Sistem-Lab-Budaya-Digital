<?php

namespace App\Http\Controllers\Api;

use App\Models\Profile\Position;
use App\Http\Requests\Profile\StorePositionRequest;
use App\Http\Requests\Profile\UpdatePositionRequest;
use App\Http\Resources\PositionResource;

class FunctionalPositionController extends BaseCrudController
{
    protected $model = Position::class;
    protected $resource = PositionResource::class;
    protected $storeRequest = StorePositionRequest::class;
    protected $updateRequest = UpdatePositionRequest::class;
    protected $with = ['lecturer'];
}
