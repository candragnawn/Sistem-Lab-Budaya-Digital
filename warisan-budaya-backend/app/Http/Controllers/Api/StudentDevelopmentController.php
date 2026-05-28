<?php

namespace App\Http\Controllers\Api;

class StudentDevelopmentController extends BaseCrudController
{
    protected $model = \App\Models\PelaksanaanPendidikan\StudentDevelopment::class;
    protected $storeRequest = "App\\Http\\Requests\\PelaksanaanPendidikan\\StoreStudentDevelopmentRequest";
    protected $updateRequest = "App\\Http\\Requests\\PelaksanaanPendidikan\\UpdateStudentDevelopmentRequest";
    protected $resource = "App\\Http\\Resources\\PelaksanaanPendidikan\\StudentDevelopmentResource";
}
