<?php

namespace App\Http\Controllers\Api;

use App\Models\Profile\Address;
use App\Http\Requests\Profile\StoreAddressRequest;
use App\Http\Requests\Profile\UpdateAddressRequest;
use App\Http\Resources\LecturerAddressResource;

class AddressController extends BaseCrudController
{
    protected $model = Address::class;
    protected $resource = LecturerAddressResource::class;
    protected $storeRequest = StoreAddressRequest::class;
    protected $updateRequest = UpdateAddressRequest::class;
    protected $with = ['lecturer'];
}
