<?php

namespace App\Http\Controllers\Api;

class WorkContractController extends BaseCrudController
{
    protected $model = \App\Models\Profile\WorkContract::class;
    protected $storeRequest = "App\\Http\\Requests\\Profile\\StoreWorkContractRequest";
    protected $updateRequest = "App\\Http\\Requests\\Profile\\UpdateWorkContractRequest";
    protected $resource = "App\\Http\\Resources\\Profile\\WorkContractResource";
}
