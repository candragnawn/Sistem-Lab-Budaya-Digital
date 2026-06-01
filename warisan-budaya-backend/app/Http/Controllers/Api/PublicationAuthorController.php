<?php

namespace App\Http\Controllers\Api;


use App\Models\PelaksanaanPenelitian\PublicationAuthor;
use App\Http\Requests\PelaksanaanPenelitian\StorePublicationAuthorRequest;
use App\Http\Requests\PelaksanaanPenelitian\UpdatePublicationAuthorRequest;
use App\Http\Resources\PelaksanaanPenelitian\PublicationAuthorResource;

class PublicationAuthorController extends BaseCrudController
{
    protected $model = PublicationAuthor::class;
    protected $resource = PublicationAuthorResource::class;
    protected $storeRequest = StorePublicationAuthorRequest::class;
    protected $updateRequest = UpdatePublicationAuthorRequest::class;
    protected $with = ['lecturer'];
}
