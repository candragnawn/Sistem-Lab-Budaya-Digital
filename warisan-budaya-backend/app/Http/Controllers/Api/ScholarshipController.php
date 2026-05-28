<?php

namespace App\Http\Controllers\Api;


use App\Models\Reward\Scholarship;
use App\Http\Requests\Reward\StoreScholarshipRequest;
use App\Http\Requests\Reward\UpdateScholarshipRequest;
use App\Http\Resources\Reward\ScholarshipResource;

class ScholarshipController extends BaseCrudController
{
    protected $model = Scholarship::class;
    protected $resource = ScholarshipResource::class;
    protected $storeRequest = StoreScholarshipRequest::class;
    protected $updateRequest = UpdateScholarshipRequest::class;
    protected $with = ['lecturer'];
}
