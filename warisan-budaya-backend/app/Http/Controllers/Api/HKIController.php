<?php

namespace App\Http\Controllers\Api;

class HKIController extends BaseCrudController
{
    protected $model = \App\Models\PelaksanaanPenelitian\HKI::class;
    protected $storeRequest = "App\\Http\\Requests\\PelaksanaanPenelitian\\StoreHKIRequest";
    protected $updateRequest = "App\\Http\\Requests\\PelaksanaanPenelitian\\UpdateHKIRequest";
    protected $resource = "App\\Http\\Resources\\PelaksanaanPenelitian\\HKIResource";
}
