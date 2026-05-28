<?php

namespace App\Http\Controllers\Api;

class PublicationController extends BaseCrudController
{
    protected $model = \App\Models\PelaksanaanPenelitian\Publication::class;
    protected $storeRequest = "App\\Http\\Requests\\PelaksanaanPenelitian\\StorePublicationRequest";
    protected $updateRequest = "App\\Http\\Requests\\PelaksanaanPenelitian\\UpdatePublicationRequest";
    protected $resource = "App\\Http\\Resources\\PelaksanaanPenelitian\\PublicationResource";
}
