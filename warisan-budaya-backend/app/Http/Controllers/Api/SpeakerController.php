<?php

namespace App\Http\Controllers\Api;


use App\Models\PelaksanaanPengabdian\Speaker;
use App\Http\Requests\PelaksanaanPengabdian\StoreSpeakerRequest;
use App\Http\Requests\PelaksanaanPengabdian\UpdateSpeakerRequest;
use App\Http\Resources\PelaksanaanPengabdian\SpeakerResource;

class SpeakerController extends BaseCrudController
{
    protected $model = Speaker::class;
    protected $resource = SpeakerResource::class;
    protected $storeRequest = StoreSpeakerRequest::class;
    protected $updateRequest = UpdateSpeakerRequest::class;
    protected $with = ['lecturer'];
}
