<?php

namespace App\Http\Controllers\Api;

class certificationController extends BaseCrudController
{
    protected $model = \App\Models\Kompetensi\certification::class;
    protected $storeRequest = "App\\Http\\Requests\\Kompetensi\\StorecertificationRequest";
    protected $updateRequest = "App\\Http\\Requests\\Kompetensi\\UpdatecertificationRequest";
    protected $resource = "App\\Http\\Resources\\Kompetensi\\certificationResource";
}
