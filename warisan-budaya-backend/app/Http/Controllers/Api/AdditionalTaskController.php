<?php

namespace App\Http\Controllers\Api;

class AdditionalTaskController extends BaseCrudController
{
    protected $model = \App\Models\PelaksanaanPendidikan\AdditionalTask::class;
    protected $storeRequest = "App\\Http\\Requests\\PelaksanaanPendidikan\\StoreAdditionalTaskRequest";
    protected $updateRequest = "App\\Http\\Requests\\PelaksanaanPendidikan\\UpdateAdditionalTaskRequest";
    protected $resource = "App\\Http\\Resources\\PelaksanaanPendidikan\\AdditionalTaskResource";
}
