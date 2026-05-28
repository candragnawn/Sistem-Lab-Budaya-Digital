<?php

namespace App\Http\Controllers\Api;

class employment_historyController extends BaseCrudController
{
    protected $model = \App\Models\Kualifikasi\employment_history::class;
    protected $storeRequest = "App\\Http\\Requests\\Kualifikasi\\Storeemployment_historyRequest";
    protected $updateRequest = "App\\Http\\Requests\\Kualifikasi\\Updateemployment_historyRequest";
    protected $resource = "App\\Http\\Resources\\Kualifikasi\\employment_historyResource";
}
