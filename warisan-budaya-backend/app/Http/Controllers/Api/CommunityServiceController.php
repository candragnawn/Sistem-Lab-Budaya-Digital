<?php

namespace App\Http\Controllers\Api;

use App\Models\PelaksanaanPengabdian\CommunityService;
use App\Http\Requests\PelaksanaanPengabdian\StoreCommunityServiceRequest;
use App\Http\Requests\PelaksanaanPengabdian\UpdateCommunityServiceRequest;
use App\Http\Resources\PelaksanaanPengabdian\CommunityServiceResource;

class CommunityServiceController extends BaseCrudController
{
    protected $model = CommunityService::class;
    protected $resource = CommunityServiceResource::class;
    protected $storeRequest = StoreCommunityServiceRequest::class;
    protected $updateRequest = UpdateCommunityServiceRequest::class;
    protected $with = ['lecturer'];
}
