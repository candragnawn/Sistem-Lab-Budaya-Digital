<?php

namespace App\Http\Controllers\Api;

use App\Models\PelaksanaanPendidikan\AcademicOration;
use App\Http\Requests\PelaksanaanPendidikan\StoreAcademicOrationRequest;
use App\Http\Requests\PelaksanaanPendidikan\UpdateAcademicOrationRequest;
use App\Http\Resources\AcademicOrationResource;

class AcademicOrationController extends BaseCrudController
{
    protected $model = AcademicOration::class;
    protected $resource = AcademicOrationResource::class;
    protected $storeRequest = StoreAcademicOrationRequest::class;
    protected $updateRequest = UpdateAcademicOrationRequest::class;
    protected $with = ['lecturer'];
}
