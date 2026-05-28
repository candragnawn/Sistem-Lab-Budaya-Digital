<?php

namespace App\Http\Controllers\Api;

use App\Models\Profile\Employment;
use App\Http\Requests\Profile\StoreEmploymentRequest;
use App\Http\Requests\Profile\UpdateEmploymentRequest;
use App\Http\Resources\Academic\LecturerEmploymentResource;

class EmploymentController extends BaseCrudController
{
    protected $model = Employment::class;
    protected $resource = LecturerEmploymentResource::class;
    protected $storeRequest = StoreEmploymentRequest::class;
    protected $updateRequest = UpdateEmploymentRequest::class;
    protected $with = ['lecturer'];
}
