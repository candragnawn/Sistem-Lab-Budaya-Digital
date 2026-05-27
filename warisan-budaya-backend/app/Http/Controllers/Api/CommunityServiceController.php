<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Api\BaseCrudController;
use App\Models\PelaksanaanPengabdian\CommunityService;

class CommunityServiceController extends BaseCrudController
{
    protected $model = \App\Models\CommunityService::class;
}
