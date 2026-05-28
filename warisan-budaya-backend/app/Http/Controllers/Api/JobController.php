<?php

namespace App\Http\Controllers\Api;

use App\Models\Job;
use App\Http\Resources\Profile\JobResource;

class JobController extends BaseCrudController
{
    protected $model = Job::class;
    protected $resource = JobResource::class;
    protected $storeRequest = null;
    protected $updateRequest = null;
    protected $with = [];
}
