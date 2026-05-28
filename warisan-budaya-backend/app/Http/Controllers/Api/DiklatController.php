<?php

namespace App\Http\Controllers\Api;

use App\Models\Kualifikasi\Diklat;
use App\Http\Requests\Kualifikasi\StoreDiklatRequest;
use App\Http\Requests\Kualifikasi\UpdateDiklatRequest;
use App\Http\Resources\DiklatResource;

class DiklatController extends BaseCrudController
{
    protected $model = Diklat::class;
    protected $resource = DiklatResource::class;
    protected $storeRequest = StoreDiklatRequest::class;
    protected $updateRequest = UpdateDiklatRequest::class;
    protected $with = ['lecturer'];
}
