<?php

namespace App\Http\Controllers\Api;

class OtherSupportingActivityController extends BaseCrudController
{
    protected $model = \App\Models\Penunjang\OtherSupportingActivity::class;
    protected $storeRequest = "App\\Http\\Requests\\Penunjang\\StoreOtherSupportingActivityRequest";
    protected $updateRequest = "App\\Http\\Requests\\Penunjang\\UpdateOtherSupportingActivityRequest";
    protected $resource = "App\\Http\\Resources\\Penunjang\\OtherSupportingActivityResource";
}
