<?php

namespace App\Http\Controllers\Api;

class AcademicController extends BaseCrudController
{
    protected $model = \App\Models\Profile\Academic::class;
    protected $storeRequest = "App\\Http\\Requests\\Profile\\StoreAcademicRequest";
    protected $updateRequest = "App\\Http\\Requests\\Profile\\UpdateAcademicRequest";
    protected $resource = "App\\Http\\Resources\\Profile\\AcademicResource";
}
