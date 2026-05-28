<?php

namespace App\Http\Controllers\Api;


use App\Models\PelaksanaanPenelitian\Research;
use App\Http\Requests\PelaksanaanPenelitian\StoreResearchRequest;
use App\Http\Requests\PelaksanaanPenelitian\UpdateResearchRequest;
use App\Http\Resources\PelaksanaanPenelitian\ResearchResource;

class ResearchController extends BaseCrudController
{
    protected $model = Research::class;
    protected $resource = ResearchResource::class;
    protected $storeRequest = StoreResearchRequest::class;
    protected $updateRequest = UpdateResearchRequest::class;
    protected $with = ['lecturer'];
}
