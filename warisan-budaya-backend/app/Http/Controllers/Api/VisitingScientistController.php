<?php

namespace App\Http\Controllers\Api;

class VisitingScientistController extends BaseCrudController
{
    protected $model = \App\Models\PelaksanaanPendidikan\VisitingScientist::class;
    protected $storeRequest = "App\\Http\\Requests\\PelaksanaanPendidikan\\StoreVisitingScientistRequest";
    protected $updateRequest = "App\\Http\\Requests\\PelaksanaanPendidikan\\UpdateVisitingScientistRequest";
    protected $resource = "App\\Http\\Resources\\PelaksanaanPendidikan\\VisitingScientistResource";
}
