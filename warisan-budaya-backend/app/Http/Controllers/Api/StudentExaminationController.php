<?php

namespace App\Http\Controllers\Api;

class StudentExaminationController extends BaseCrudController
{
    protected $model = \App\Models\PelaksanaanPendidikan\StudentExamination::class;
    protected $storeRequest = "App\\Http\\Requests\\PelaksanaanPendidikan\\StoreStudentExaminationRequest";
    protected $updateRequest = "App\\Http\\Requests\\PelaksanaanPendidikan\\UpdateStudentExaminationRequest";
    protected $resource = "App\\Http\\Resources\\PelaksanaanPendidikan\\StudentExaminationResource";
}
