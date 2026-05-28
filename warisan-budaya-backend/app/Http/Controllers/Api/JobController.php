<?php

namespace App\Http\Controllers\Api;

use App\Models\Job;
use App\Http\Requests\StoreJobRequest;
use App\Http\Requests\UpdateJobRequest;
use App\Http\Resources\JobResource;

class JobController extends BaseCrudController
{
    protected $model = Job::class;
    protected $resource = JobResource::class;
    protected $storeRequest = StoreJobRequest::class;
    protected $updateRequest = UpdateJobRequest::class;
    protected $with = ['lecturer'];
}
