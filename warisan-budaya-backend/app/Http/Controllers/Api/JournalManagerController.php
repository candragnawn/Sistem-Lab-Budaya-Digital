<?php

namespace App\Http\Controllers\Api;

use App\Models\PelaksanaanPengabdian\JournalManager;
use App\Http\Requests\PelaksanaanPengabdian\StoreJournalManagerRequest;
use App\Http\Requests\PelaksanaanPengabdian\UpdateJournalManagerRequest;
use App\Http\Resources\PelaksanaanPengabdian\JournalManagerResource;

class JournalManagerController extends BaseCrudController
{
    protected $model = JournalManager::class;
    protected $resource = JournalManagerResource::class;
    protected $storeRequest = StoreJournalManagerRequest::class;
    protected $updateRequest = UpdateJournalManagerRequest::class;
    protected $with = ['lecturer'];
}
