<?php

namespace App\Http\Controllers\Api;

class StudentSupervisionController extends BaseCrudController
{
    protected $model = \App\Models\PelaksanaanPendidikan\StudentSupervision::class;
    protected $storeRequest = "App\\Http\\Requests\\PelaksanaanPendidikan\\StoreStudentSupervisionRequest";
    protected $updateRequest = "App\\Http\\Requests\\PelaksanaanPendidikan\\UpdateStudentSupervisionRequest";
    protected $resource = "App\\Http\\Resources\\PelaksanaanPendidikan\\StudentSupervisionResource";
}
