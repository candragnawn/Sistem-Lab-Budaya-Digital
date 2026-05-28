<?php

namespace App\Http\Controllers\Api;

class LecturerStatController extends BaseCrudController
{
    protected $model = \App\Models\Profile\LecturerStat::class;
    protected $storeRequest = "App\\Http\\Requests\\Profile\\StoreLecturerStatRequest";
    protected $updateRequest = "App\\Http\\Requests\\Profile\\UpdateLecturerStatRequest";
    protected $resource = "App\\Http\\Resources\\Profile\\LecturerStatResource";
}
