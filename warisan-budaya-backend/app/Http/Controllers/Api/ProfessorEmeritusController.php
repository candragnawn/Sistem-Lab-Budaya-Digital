<?php

namespace App\Http\Controllers\Api;

class ProfessorEmeritusController extends BaseCrudController
{
    protected $model = \App\Models\Profile\ProfessorEmeritus::class;
    protected $storeRequest = "App\\Http\\Requests\\Profile\\StoreProfessorEmeritusRequest";
    protected $updateRequest = "App\\Http\\Requests\\Profile\\UpdateProfessorEmeritusRequest";
    protected $resource = "App\\Http\\Resources\\Profile\\ProfessorEmeritusResource";
}
