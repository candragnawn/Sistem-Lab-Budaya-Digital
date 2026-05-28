<?php

namespace App\Http\Controllers\Api;

class PositionController extends BaseCrudController
{
    protected $model = \App\Models\Profile\Position::class;
    protected $storeRequest = "App\\Http\\Requests\\Profile\\StorePositionRequest";
    protected $updateRequest = "App\\Http\\Requests\\Profile\\UpdatePositionRequest";
    protected $resource = "App\\Http\\Resources\\Profile\\PositionResource";
}
