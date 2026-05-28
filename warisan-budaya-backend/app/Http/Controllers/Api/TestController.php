<?php

namespace App\Http\Controllers\Api;

class testController extends BaseCrudController
{
    protected $model = \App\Models\Kompetensi\test::class;
    protected $storeRequest = "App\\Http\\Requests\\Kompetensi\\StoretestRequest";
    protected $updateRequest = "App\\Http\\Requests\\Kompetensi\\UpdatetestRequest";
    protected $resource = "App\\Http\\Resources\\Kompetensi\\testResource";
}
