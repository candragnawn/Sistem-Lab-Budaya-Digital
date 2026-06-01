<?php

namespace App\Http\Controllers\Api;


use App\Models\PelaksanaanPendidikan\VisitingScientist;
use App\Http\Requests\PelaksanaanPendidikan\StoreVisitingScientistRequest;
use App\Http\Requests\PelaksanaanPendidikan\UpdateVisitingScientistRequest;
use App\Http\Resources\PelaksanaanPendidikan\VisitingScientistResource;

class VisitingScientistController extends BaseCrudController
{
    protected $model = VisitingScientist::class;
    protected $resource = VisitingScientistResource::class;
    protected $storeRequest = StoreVisitingScientistRequest::class;
    protected $updateRequest = UpdateVisitingScientistRequest::class;
    protected $with = ['lecturer'];
}
