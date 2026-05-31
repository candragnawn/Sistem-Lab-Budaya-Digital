<?php

namespace App\Http\Controllers\Api;


use App\Models\PelaksanaanPenelitian\Publication;
use App\Http\Requests\PelaksanaanPenelitian\StorePublicationRequest;
use App\Http\Requests\PelaksanaanPenelitian\UpdatePublicationRequest;
use App\Http\Resources\PelaksanaanPenelitian\PublicationResource;

class PublicationController extends BaseCrudController
{
    protected $model = Publication::class;
    protected $resource = PublicationResource::class;
    protected $storeRequest = StorePublicationRequest::class;
    protected $updateRequest = UpdatePublicationRequest::class;
    protected $with = ['lecturer'];
}
