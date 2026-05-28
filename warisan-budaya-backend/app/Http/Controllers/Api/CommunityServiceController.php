<?php

namespace App\Http\Controllers\Api;

class CommunityServiceController extends BaseCrudController
{
    protected $model = \App\Models\PelaksanaanPengabdian\CommunityService::class;
    protected $storeRequest = "App\\Http\\Requests\\PelaksanaanPengabdian\\StoreCommunityServiceRequest";
    protected $updateRequest = "App\\Http\\Requests\\PelaksanaanPengabdian\\UpdateCommunityServiceRequest";
    protected $resource = "App\\Http\\Resources\\PelaksanaanPengabdian\\CommunityServiceResource";
}
