<?php

namespace App\Http\Controllers\Api;


use App\Models\PelaksanaanPendidikan\TeachingMaterial;
use App\Http\Requests\PelaksanaanPendidikan\StoreTeachingMaterialRequest;
use App\Http\Requests\PelaksanaanPendidikan\UpdateTeachingMaterialRequest;
use App\Http\Resources\PelaksanaanPendidikan\TeachingMaterialResource;

class TeachingMaterialController extends BaseCrudController
{
    protected $model = TeachingMaterial::class;
    protected $resource = TeachingMaterialResource::class;
    protected $storeRequest = StoreTeachingMaterialRequest::class;
    protected $updateRequest = UpdateTeachingMaterialRequest::class;
    protected $with = ['lecturer'];
}
