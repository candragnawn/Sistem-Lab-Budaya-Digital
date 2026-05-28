<?php

namespace App\Http\Controllers\Api;


use App\Models\PelaksanaanPendidikan\StudentSupervision;
use App\Http\Requests\PelaksanaanPendidikan\StoreStudentSupervisionRequest;
use App\Http\Requests\PelaksanaanPendidikan\UpdateStudentSupervisionRequest;
use App\Http\Resources\PelaksanaanPendidikan\StudentSupervisionResource;

class StudentSupervisionController extends BaseCrudController
{
    protected $model = StudentSupervision::class;
    protected $resource = StudentSupervisionResource::class;
    protected $storeRequest = StoreStudentSupervisionRequest::class;
    protected $updateRequest = UpdateStudentSupervisionRequest::class;
    protected $with = ['lecturer'];
}
