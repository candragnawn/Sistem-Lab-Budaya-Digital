<?php

namespace App\Http\Controllers\Api;


use App\Models\SourceSync;
use App\Http\Requests\StoreSourceSyncRequest;
use App\Http\Requests\UpdateSourceSyncRequest;
use App\Http\Resources\SourceSyncResource;

class SourceSyncController extends BaseCrudController
{
    protected $model = SourceSync::class;
    protected $resource = SourceSyncResource::class;
    protected $storeRequest = StoreSourceSyncRequest::class;
    protected $updateRequest = UpdateSourceSyncRequest::class;
    protected $with = ['lecturer'];
}
