<?php

namespace App\Http\Controllers\Api;


use App\Models\PelaksanaanPengabdian\StructuralPosition;
use App\Http\Requests\PelaksanaanPengabdian\StoreStructuralPositionRequest;
use App\Http\Requests\PelaksanaanPengabdian\UpdateStructuralPositionRequest;
use App\Http\Resources\PelaksanaanPengabdian\StructuralPositionResource;

class StructuralPositionController extends BaseCrudController
{
    protected $model = StructuralPosition::class;
    protected $resource = StructuralPositionResource::class;
    protected $storeRequest = StoreStructuralPositionRequest::class;
    protected $updateRequest = UpdateStructuralPositionRequest::class;
    protected $with = ['lecturer'];
}
