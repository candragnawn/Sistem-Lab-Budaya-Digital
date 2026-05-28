<?php

namespace App\Http\Controllers\Api;

class JournalManagerController extends BaseCrudController
{
    protected $model = \App\Models\PelaksanaanPengabdian\JournalManager::class;
    protected $storeRequest = "App\\Http\\Requests\\PelaksanaanPengabdian\\StoreJournalManagerRequest";
    protected $updateRequest = "App\\Http\\Requests\\PelaksanaanPengabdian\\UpdateJournalManagerRequest";
    protected $resource = "App\\Http\\Resources\\PelaksanaanPengabdian\\JournalManagerResource";
}
