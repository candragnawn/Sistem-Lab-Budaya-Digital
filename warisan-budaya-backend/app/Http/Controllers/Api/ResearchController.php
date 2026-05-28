<?php

namespace App\Http\Controllers\Api;

class ResearchController extends BaseCrudController
{
    protected $model = \App\Models\PelaksanaanPenelitian\Research::class;
    protected $storeRequest = "App\\Http\\Requests\\PelaksanaanPenelitian\\StoreResearchRequest";
    protected $updateRequest = "App\\Http\\Requests\\PelaksanaanPenelitian\\UpdateResearchRequest";
    protected $resource = "App\\Http\\Resources\\PelaksanaanPenelitian\\ResearchResource";
}
