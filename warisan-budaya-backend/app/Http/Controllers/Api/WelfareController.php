<?php

namespace App\Http\Controllers\Api;


use App\Models\Reward\Welfare;
use App\Http\Requests\Reward\StoreWelfareRequest;
use App\Http\Requests\Reward\UpdateWelfareRequest;
use App\Http\Resources\Reward\WelfareResource;

class WelfareController extends BaseCrudController
{
    protected $model = Welfare::class;
    protected $resource = WelfareResource::class;
    protected $storeRequest = StoreWelfareRequest::class;
    protected $updateRequest = UpdateWelfareRequest::class;
    protected $with = ['lecturer'];
}
