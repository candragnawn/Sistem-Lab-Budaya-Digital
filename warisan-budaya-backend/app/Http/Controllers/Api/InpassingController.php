<?php

namespace App\Http\Controllers\Api;

class InpassingController extends BaseCrudController
{
    protected $model = \App\Models\Profile\Inpassing::class;
    protected $storeRequest = "App\\Http\\Requests\\Profile\\StoreInpassingRequest";
    protected $updateRequest = "App\\Http\\Requests\\Profile\\UpdateInpassingRequest";
    protected $resource = "App\\Http\\Resources\\Profile\\InpassingResource";
}
