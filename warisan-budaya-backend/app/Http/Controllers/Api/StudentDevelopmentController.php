<?php

namespace App\Http\Controllers\Api;


use App\Models\PelaksanaanPendidikan\StudentDevelopment;
use App\Http\Requests\PelaksanaanPendidikan\StoreStudentDevelopmentRequest;
use App\Http\Requests\PelaksanaanPendidikan\UpdateStudentDevelopmentRequest;
use App\Http\Resources\PelaksanaanPendidikan\StudentDevelopmentResource;

class StudentDevelopmentController extends BaseCrudController
{
    protected $model = StudentDevelopment::class;
    protected $resource = StudentDevelopmentResource::class;
    protected $storeRequest = StoreStudentDevelopmentRequest::class;
    protected $updateRequest = UpdateStudentDevelopmentRequest::class;
    protected $with = ['lecturer'];
}
