<?php

namespace App\Http\Controllers\Api;

class PlacementController extends BaseCrudController
{
    protected $model = \App\Models\Profile\Placement::class;
    protected $storeRequest = "App\\Http\\Requests\\Profile\\StorePlacementRequest";
    protected $updateRequest = "App\\Http\\Requests\\Profile\\UpdatePlacementRequest";
    protected $resource = "App\\Http\\Resources\\Profile\\PlacementResource";
}
