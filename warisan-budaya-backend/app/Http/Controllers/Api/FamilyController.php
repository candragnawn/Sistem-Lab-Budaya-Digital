<?php

namespace App\Http\Controllers\Api;

class FamilyController extends BaseCrudController
{
    protected $model = \App\Models\Profile\Family::class;
    protected $storeRequest = "App\\Http\\Requests\\Profile\\StoreFamilyRequest";
    protected $updateRequest = "App\\Http\\Requests\\Profile\\UpdateFamilyRequest";
    protected $resource = "App\\Http\\Resources\\Profile\\FamilyResource";
}
