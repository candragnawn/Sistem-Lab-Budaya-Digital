<?php

namespace App\Http\Controllers\Api;

class TeachingController extends BaseCrudController
{
    protected $model = \App\Models\PelaksanaanPendidikan\Teaching::class;
    protected $storeRequest = "App\\Http\\Requests\\PelaksanaanPendidikan\\StoreTeachingRequest";
    protected $updateRequest = "App\\Http\\Requests\\PelaksanaanPendidikan\\UpdateTeachingRequest";
    protected $resource = "App\\Http\\Resources\\PelaksanaanPendidikan\\TeachingResource";
}
