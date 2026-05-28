<?php

namespace App\Http\Controllers\Api;

class SpeakerController extends BaseCrudController
{
    protected $model = \App\Models\PelaksanaanPengabdian\Speaker::class;
    protected $storeRequest = "App\\Http\\Requests\\PelaksanaanPengabdian\\StoreSpeakerRequest";
    protected $updateRequest = "App\\Http\\Requests\\PelaksanaanPengabdian\\UpdateSpeakerRequest";
    protected $resource = "App\\Http\\Resources\\PelaksanaanPengabdian\\SpeakerResource";
}
