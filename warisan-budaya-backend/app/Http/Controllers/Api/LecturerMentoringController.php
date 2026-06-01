<?php

namespace App\Http\Controllers\Api;


use App\Models\PelaksanaanPendidikan\LecturerMentoring;
use App\Http\Requests\PelaksanaanPendidikan\StoreLecturerMentoringRequest;
use App\Http\Requests\PelaksanaanPendidikan\UpdateLecturerMentoringRequest;
use App\Http\Resources\PelaksanaanPendidikan\LecturerMentoringResource;

class LecturerMentoringController extends BaseCrudController
{
    protected $model = LecturerMentoring::class;
    protected $resource = LecturerMentoringResource::class;
    protected $storeRequest = StoreLecturerMentoringRequest::class;
    protected $updateRequest = UpdateLecturerMentoringRequest::class;
    protected $with = ['lecturer'];
}
