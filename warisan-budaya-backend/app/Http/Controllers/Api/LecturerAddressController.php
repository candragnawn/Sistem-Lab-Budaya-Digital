<?php

namespace App\Http\Controllers\Api;

use App\Models\Profile\Address;
use App\Http\Requests\Profile\StoreAddressRequest;
use App\Http\Requests\Profile\UpdateAddressRequest;
use App\Http\Resources\Profile\AddressResource;

class LecturerAddressController extends BaseCrudController
{
    protected $model = Address::class;
    protected $resource = AddressResource::class;
    protected $storeRequest = StoreAddressRequest::class;
    protected $updateRequest = UpdateAddressRequest::class;
    protected $with = ['lecturer'];
}
