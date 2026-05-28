<?php

namespace App\Http\Controllers\Api;

class RankController extends BaseCrudController
{
    protected $model = \App\Models\Profile\Rank::class;
    protected $storeRequest = "App\\Http\\Requests\\Profile\\StoreRankRequest";
    protected $updateRequest = "App\\Http\\Requests\\Profile\\UpdateRankRequest";
    protected $resource = "App\\Http\\Resources\\Profile\\RankResource";
}
