<?php

namespace App\Http\Controllers\Api;

class AddressController extends BaseCrudController
{
    protected $model = \App\Models\Profile\Address::class;
    protected $storeRequest = "App\\Http\\Requests\\Profile\\StoreAddressRequest";
    protected $updateRequest = "App\\Http\\Requests\\Profile\\UpdateAddressRequest";
    protected $resource = "App\\Http\\Resources\\Profile\\AddressResource";
}
