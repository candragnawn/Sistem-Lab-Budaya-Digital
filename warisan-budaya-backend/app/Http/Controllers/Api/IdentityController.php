<?php

namespace App\Http\Controllers\Api;

class IdentityController extends BaseCrudController
{
    protected $model = \App\Models\Profile\Identity::class;
    protected $storeRequest = "App\\Http\\Requests\\Profile\\StoreIdentityRequest";
    protected $updateRequest = "App\\Http\\Requests\\Profile\\UpdateIdentityRequest";
    protected $resource = "App\\Http\\Resources\\Profile\\IdentityResource";
}
