<?php

namespace App\Http\Controllers\Api;

use App\Models\Profile\LecturerAcademic;
use App\Http\Requests\Profile\StoreAcademicRequest;
use App\Http\Requests\Profile\UpdateAcademicRequest;
use App\Http\Resources\Profile\AcademicResource;

class LecturerAcademicController extends BaseCrudController
{
    protected $model = LecturerAcademic::class;
    protected $resource = AcademicResource::class;
    protected $storeRequest = StoreAcademicRequest::class;
    protected $updateRequest = UpdateAcademicRequest::class;
    protected $with = ['lecturer'];
}
