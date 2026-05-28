<?php

namespace App\Http\Controllers\Api;

class diklatController extends BaseCrudController
{
    protected $model = \App\Models\Kualifikasi\diklat::class;
    protected $storeRequest = "App\\Http\\Requests\\Kualifikasi\\StorediklatRequest";
    protected $updateRequest = "App\\Http\\Requests\\Kualifikasi\\UpdatediklatRequest";
    protected $resource = "App\\Http\\Resources\\Kualifikasi\\diklatResource";
}
