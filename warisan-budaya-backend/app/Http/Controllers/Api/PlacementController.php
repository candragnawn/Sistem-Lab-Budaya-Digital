<?php

namespace App\Http\Controllers\Api;


use App\Models\Profile\placements;
use App\Http\Requests\Profile\StorePlacementsRequest;
use App\Http\Requests\Profile\UpdatePlacementsRequest;
use App\Http\Resources\Profile\PlacementsResource;

class PlacementController extends BaseCrudController
{
    protected $model = placements::class;
    protected $resource = PlacementsResource::class;
    protected $storeRequest = StorePlacementsRequest::class;
    protected $updateRequest = UpdatePlacementsRequest::class;
    protected $with = ['lecturer'];
}
