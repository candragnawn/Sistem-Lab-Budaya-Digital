<?php

namespace App\Http\Controllers\Api;

class WelfareController extends BaseCrudController
{
    protected $model = \App\Models\Reward\Welfare::class;
    protected $storeRequest = "App\\Http\\Requests\\Reward\\StoreWelfareRequest";
    protected $updateRequest = "App\\Http\\Requests\\Reward\\UpdateWelfareRequest";
    protected $resource = "App\\Http\\Resources\\Reward\\WelfareResource";
}
