<?php

namespace App\Http\Controllers\Api;

class AwardController extends BaseCrudController
{
    protected $model = \App\Models\Penunjang\Award::class;
    protected $storeRequest = "App\\Http\\Requests\\Penunjang\\StoreAwardRequest";
    protected $updateRequest = "App\\Http\\Requests\\Penunjang\\UpdateAwardRequest";
    protected $resource = "App\\Http\\Resources\\Penunjang\\AwardResource";
}
