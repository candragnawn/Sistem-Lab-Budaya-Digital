<?php

namespace App\Http\Controllers\Api;

class AllowanceController extends BaseCrudController
{
    protected $model = \App\Models\Reward\Allowance::class;
    protected $storeRequest = "App\\Http\\Requests\\Reward\\StoreAllowanceRequest";
    protected $updateRequest = "App\\Http\\Requests\\Reward\\UpdateAllowanceRequest";
    protected $resource = "App\\Http\\Resources\\Reward\\AllowanceResource";
}
