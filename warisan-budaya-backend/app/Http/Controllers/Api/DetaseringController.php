<?php

namespace App\Http\Controllers\Api;

class DetaseringController extends BaseCrudController
{
    protected $model = \App\Models\PelaksanaanPendidikan\Detasering::class;
    protected $storeRequest = "App\\Http\\Requests\\PelaksanaanPendidikan\\StoreDetaseringRequest";
    protected $updateRequest = "App\\Http\\Requests\\PelaksanaanPendidikan\\UpdateDetaseringRequest";
    protected $resource = "App\\Http\\Resources\\PelaksanaanPendidikan\\DetaseringResource";
}
