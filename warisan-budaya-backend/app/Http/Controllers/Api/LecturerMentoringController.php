<?php

namespace App\Http\Controllers\Api;

class LecturerMentoringController extends BaseCrudController
{
    protected $model = \App\Models\PelaksanaanPendidikan\LecturerMentoring::class;
    protected $storeRequest = "App\\Http\\Requests\\PelaksanaanPendidikan\\StoreLecturerMentoringRequest";
    protected $updateRequest = "App\\Http\\Requests\\PelaksanaanPendidikan\\UpdateLecturerMentoringRequest";
    protected $resource = "App\\Http\\Resources\\PelaksanaanPendidikan\\LecturerMentoringResource";
}
