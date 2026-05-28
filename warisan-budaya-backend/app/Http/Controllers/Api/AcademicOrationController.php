<?php

namespace App\Http\Controllers\Api;

class AcademicOrationController extends BaseCrudController
{
    protected $model = \App\Models\PelaksanaanPendidikan\AcademicOration::class;
    protected $storeRequest = "App\\Http\\Requests\\PelaksanaanPendidikan\\StoreAcademicOrationRequest";
    protected $updateRequest = "App\\Http\\Requests\\PelaksanaanPendidikan\\UpdateAcademicOrationRequest";
    protected $resource = "App\\Http\\Resources\\PelaksanaanPendidikan\\AcademicOrationResource";
}
