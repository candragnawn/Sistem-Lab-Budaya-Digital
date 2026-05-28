<?php

namespace App\Http\Controllers\Api;

class educationsController extends BaseCrudController
{
    protected $model = \App\Models\Kualifikasi\educations::class;
    protected $storeRequest = "App\\Http\\Requests\\Kualifikasi\\StoreeducationsRequest";
    protected $updateRequest = "App\\Http\\Requests\\Kualifikasi\\UpdateeducationsRequest";
    protected $resource = "App\\Http\\Resources\\Kualifikasi\\educationsResource";
}
