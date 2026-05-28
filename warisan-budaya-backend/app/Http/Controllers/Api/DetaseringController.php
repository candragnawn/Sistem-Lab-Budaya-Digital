<?php

namespace App\Http\Controllers\Api;

use App\Models\PelaksanaanPendidikan\Detasering;
use App\Http\Requests\PelaksanaanPendidikan\StoreDetaseringRequest;
use App\Http\Requests\PelaksanaanPendidikan\UpdateDetaseringRequest;
use App\Http\Resources\DetaseringResource;

class DetaseringController extends BaseCrudController
{
    protected $model = Detasering::class;
    protected $resource = DetaseringResource::class;
    protected $storeRequest = StoreDetaseringRequest::class;
    protected $updateRequest = UpdateDetaseringRequest::class;
    protected $with = ['lecturer'];
}
