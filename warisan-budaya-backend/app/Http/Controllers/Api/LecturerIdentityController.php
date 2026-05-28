<?php

namespace App\Http\Controllers\Api;


use App\Models\Profile\Identity;
use App\Http\Requests\Profile\StoreIdentityRequest;
use App\Http\Requests\Profile\UpdateIdentityRequest;
use App\Http\Resources\Academic\LecturerIdentityResource;

class LecturerIdentityController extends BaseCrudController
{
    protected $model = Identity::class;
    protected $resource = LecturerIdentityResource::class;
    protected $storeRequest = StoreIdentityRequest::class;
    protected $updateRequest = UpdateIdentityRequest::class;
    protected $with = ['lecturer'];
}
