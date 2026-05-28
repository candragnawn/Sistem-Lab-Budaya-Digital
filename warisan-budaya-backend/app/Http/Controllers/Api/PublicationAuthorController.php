<?php

namespace App\Http\Controllers\Api;

class PublicationAuthorController extends BaseCrudController
{
    protected $model = \App\Models\PelaksanaanPenelitian\PublicationAuthor::class;
    protected $storeRequest = "App\\Http\\Requests\\PelaksanaanPenelitian\\StorePublicationAuthorRequest";
    protected $updateRequest = "App\\Http\\Requests\\PelaksanaanPenelitian\\UpdatePublicationAuthorRequest";
    protected $resource = "App\\Http\\Resources\\PelaksanaanPenelitian\\PublicationAuthorResource";
}
