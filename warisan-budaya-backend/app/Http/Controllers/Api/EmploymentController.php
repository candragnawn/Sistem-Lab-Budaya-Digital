<?php

namespace App\Http\Controllers\Api;

class EmploymentController extends BaseCrudController
{
    protected $model = \App\Models\Profile\Employment::class;
    protected $storeRequest = "App\\Http\\Requests\\Profile\\StoreEmploymentRequest";
    protected $updateRequest = "App\\Http\\Requests\\Profile\\UpdateEmploymentRequest";
    protected $resource = "App\\Http\\Resources\\Profile\\EmploymentResource";
}
