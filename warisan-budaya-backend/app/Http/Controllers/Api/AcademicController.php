<?php

namespace App\Http\Controllers\Api;

use App\Models\Profile\Academic;
use App\Http\Requests\Profile\StoreAcademicRequest;
use App\Http\Requests\Profile\UpdateAcademicRequest;
use App\Http\Resources\Academic\LecturerAcademicResource;

class AcademicController extends BaseCrudController
{
    protected $model = Academic::class;
    protected $resource = LecturerAcademicResource::class;
    protected $storeRequest = StoreAcademicRequest::class;
    protected $updateRequest = UpdateAcademicRequest::class;
    protected $with = ['lecturer'];
}
