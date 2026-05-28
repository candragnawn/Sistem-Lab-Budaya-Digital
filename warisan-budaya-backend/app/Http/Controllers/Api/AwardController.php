<?php

namespace App\Http\Controllers\Api;

use App\Models\Penunjang\Award;
use App\Http\Requests\Penunjang\StoreAwardRequest;
use App\Http\Requests\Penunjang\UpdateAwardRequest;
use App\Http\Resources\Penunjang\AwardResource;

class AwardController extends BaseCrudController
{
    protected $model = Award::class;
    protected $resource = AwardResource::class;
    protected $storeRequest = StoreAwardRequest::class;
    protected $updateRequest = UpdateAwardRequest::class;
    protected $with = ['lecturer'];
}
