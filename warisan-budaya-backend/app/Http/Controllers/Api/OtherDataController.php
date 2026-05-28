<?php

namespace App\Http\Controllers\Api;

class OtherDataController extends BaseCrudController
{
    protected $model = \App\Models\Profile\OtherData::class;
    protected $storeRequest = "App\\Http\\Requests\\Profile\\StoreOtherDataRequest";
    protected $updateRequest = "App\\Http\\Requests\\Profile\\UpdateOtherDataRequest";
    protected $resource = "App\\Http\\Resources\\Profile\\OtherDataResource";
}
