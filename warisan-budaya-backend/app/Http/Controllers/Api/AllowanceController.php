<?php

namespace App\Http\Controllers\Api;

use App\Models\Reward\Allowance;
use App\Http\Requests\Reward\StoreAllowanceRequest;
use App\Http\Requests\Reward\UpdateAllowanceRequest;
use App\Http\Resources\Reward\AllowanceResource;

class AllowanceController extends BaseCrudController
{
    protected $model = Allowance::class;
    protected $resource = AllowanceResource::class;
    protected $storeRequest = StoreAllowanceRequest::class;
    protected $updateRequest = UpdateAllowanceRequest::class;
    protected $with = ['lecturer'];
}
