<?php

namespace App\Http\Controllers\Api;

class ScholarshipController extends BaseCrudController
{
    protected $model = \App\Models\Reward\Scholarship::class;
    protected $storeRequest = "App\\Http\\Requests\\Reward\\StoreScholarshipRequest";
    protected $updateRequest = "App\\Http\\Requests\\Reward\\UpdateScholarshipRequest";
    protected $resource = "App\\Http\\Resources\\Reward\\ScholarshipResource";
}
