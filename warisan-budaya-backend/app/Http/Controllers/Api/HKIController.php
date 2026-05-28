<?php

namespace App\Http\Controllers\Api;

use App\Models\PelaksanaanPenelitian\HKI;
use App\Http\Requests\PelaksanaanPenelitian\StoreHKIRequest;
use App\Http\Requests\PelaksanaanPenelitian\UpdateHKIRequest;
use App\Http\Resources\HKIResource;

class HKIController extends BaseCrudController
{
    protected $model = HKI::class;
    protected $resource = HKIResource::class;
    protected $storeRequest = StoreHKIRequest::class;
    protected $updateRequest = UpdateHKIRequest::class;
    protected $with = ['lecturer'];
}
