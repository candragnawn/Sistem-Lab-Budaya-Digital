<?php

namespace App\Http\Controllers\Api;


use App\Models\PelaksanaanPendidikan\StudentExamination;
use App\Http\Requests\PelaksanaanPendidikan\StoreStudentExaminationRequest;
use App\Http\Requests\PelaksanaanPendidikan\UpdateStudentExaminationRequest;
use App\Http\Resources\PelaksanaanPendidikan\StudentExaminationResource;

class StudentExaminationController extends BaseCrudController
{
    protected $model = StudentExamination::class;
    protected $resource = StudentExaminationResource::class;
    protected $storeRequest = StoreStudentExaminationRequest::class;
    protected $updateRequest = UpdateStudentExaminationRequest::class;
    protected $with = ['lecturer'];
}
