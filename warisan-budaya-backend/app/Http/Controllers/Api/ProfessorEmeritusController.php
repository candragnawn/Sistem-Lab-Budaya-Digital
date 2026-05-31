<?php

namespace App\Http\Controllers\Api;


use App\Models\Profile\ProfessorEmeritus;
use App\Http\Requests\Profile\StoreProfessorEmeritusRequest;
use App\Http\Requests\Profile\UpdateProfessorEmeritusRequest;
use App\Http\Resources\Profile\ProfessorEmeritusResource;

class ProfessorEmeritusController extends BaseCrudController
{
    protected $model = ProfessorEmeritus::class;
    protected $resource = ProfessorEmeritusResource::class;
    protected $storeRequest = StoreProfessorEmeritusRequest::class;
    protected $updateRequest = UpdateProfessorEmeritusRequest::class;
    protected $with = ['lecturer'];
}
