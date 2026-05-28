<?php

namespace App\Http\Controllers\Api;

use App\Models\Profile\Family;
use App\Http\Requests\Profile\StoreFamilyRequest;
use App\Http\Requests\Profile\UpdateFamilyRequest;
use App\Http\Resources\Profile\FamilyResource;

class FamilyController extends BaseCrudController
{
    protected $model = Family::class;
    protected $resource = FamilyResource::class;
    protected $storeRequest = StoreFamilyRequest::class;
    protected $updateRequest = UpdateFamilyRequest::class;
    protected $with = ['lecturer'];
}
