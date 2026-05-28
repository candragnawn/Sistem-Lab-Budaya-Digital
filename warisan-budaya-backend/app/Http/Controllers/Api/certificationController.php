<?php

namespace App\Http\Controllers\Api;

use App\Models\Kompetensi\certification;
use App\Http\Requests\Kompetensi\StoreCertificationRequest;
use App\Http\Requests\Kompetensi\UpdateCertificationRequest;
use App\Http\Resources\Kompetensi\CertificationResource;

class CertificationController extends BaseCrudController
{
    protected $model = certification::class;
    protected $resource = CertificationResource::class;
    protected $storeRequest = StoreCertificationRequest::class;
    protected $updateRequest = UpdateCertificationRequest::class;
    protected $with = ['lecturer'];
}
