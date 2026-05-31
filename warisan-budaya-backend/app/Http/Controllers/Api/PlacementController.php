<?php

namespace App\Http\Controllers\Api;


use App\Models\Profile\Placement;
use App\Http\Requests\Profile\StorePlacementRequest;
use App\Http\Requests\Profile\UpdatePlacementRequest;
use App\Http\Resources\Profile\PlacementResource;

class PlacementController extends BaseCrudController
{
    protected $model = Placement::class;
    protected $resource = PlacementResource::class;
    protected $storeRequest = StorePlacementRequest::class;
    protected $updateRequest = UpdatePlacementRequest::class;
    protected $with = ['lecturer'];
}
