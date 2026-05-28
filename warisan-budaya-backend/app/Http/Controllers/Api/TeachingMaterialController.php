<?php

namespace App\Http\Controllers\Api;

class TeachingMaterialController extends BaseCrudController
{
    protected $model = \App\Models\PelaksanaanPendidikan\TeachingMaterial::class;
    protected $storeRequest = "App\\Http\\Requests\\PelaksanaanPendidikan\\StoreTeachingMaterialRequest";
    protected $updateRequest = "App\\Http\\Requests\\PelaksanaanPendidikan\\UpdateTeachingMaterialRequest";
    protected $resource = "App\\Http\\Resources\\PelaksanaanPendidikan\\TeachingMaterialResource";
}
