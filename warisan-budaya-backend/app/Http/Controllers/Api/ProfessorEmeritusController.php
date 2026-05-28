<?php

namespace App\Http\Controllers\Api;


use App\Models\Profile\professor_emeritus;
use App\Http\Requests\Profile\StoreProfessor_emeritusRequest;
use App\Http\Requests\Profile\UpdateProfessor_emeritusRequest;
use App\Http\Resources\Profile\Professor_emeritusResource;

class ProfessorEmeritusController extends BaseCrudController
{
    protected $model = professor_emeritus::class;
    protected $resource = Professor_emeritusResource::class;
    protected $storeRequest = StoreProfessor_emeritusRequest::class;
    protected $updateRequest = UpdateProfessor_emeritusRequest::class;
    protected $with = ['lecturer'];
}
