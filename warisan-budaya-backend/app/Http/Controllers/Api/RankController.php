<?php

namespace App\Http\Controllers\Api;


use App\Models\Profile\Rank;
use App\Http\Requests\Profile\StoreRankRequest;
use App\Http\Requests\Profile\UpdateRankRequest;
use App\Http\Resources\Profile\RankResource;

class RankController extends BaseCrudController
{
    protected $model = Rank::class;
    protected $resource = RankResource::class;
    protected $storeRequest = StoreRankRequest::class;
    protected $updateRequest = UpdateRankRequest::class;
    protected $with = ['lecturer'];
}
