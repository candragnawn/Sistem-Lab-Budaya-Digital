<?php

namespace App\Http\Controllers\Api;

use App\Models\Profile\Family;
use App\Http\Requests\Profile\StoreFamilyRequest;
use App\Http\Requests\Profile\UpdateFamilyRequest;
use App\Http\Resources\Academic\LecturerFamilyResource;

class LecturerFamilyController extends BaseCrudController
{
    protected $model = Family::class;
    protected $resource = LecturerFamilyResource::class;
    protected $storeRequest = StoreFamilyRequest::class;
    protected $updateRequest = UpdateFamilyRequest::class;
    protected $with = ['lecturer'];
}
