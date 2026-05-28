<?php

namespace App\Http\Controllers\Api;


use App\Models\Penunjang\OtherSupportingActivity;
use App\Http\Requests\Penunjang\StoreOtherSupportingActivityRequest;
use App\Http\Requests\Penunjang\UpdateOtherSupportingActivityRequest;
use App\Http\Resources\Penunjang\OtherSupportingActivityResource;

class OtherSupportingActivityController extends BaseCrudController
{
    protected $model = OtherSupportingActivity::class;
    protected $resource = OtherSupportingActivityResource::class;
    protected $storeRequest = StoreOtherSupportingActivityRequest::class;
    protected $updateRequest = UpdateOtherSupportingActivityRequest::class;
    protected $with = ['lecturer'];
}
