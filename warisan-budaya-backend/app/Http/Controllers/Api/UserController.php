<?php

namespace App\Http\Controllers\Api;


use App\Models\User;
use App\Http\Requests\Master\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\Master\UserResource;

class UserController extends BaseCrudController
{
    protected $model = User::class;
    protected $resource = UserResource::class;
    protected $storeRequest = StoreUserRequest::class;
    protected $updateRequest = UpdateUserRequest::class;
    protected $with = ['lecturer'];
}
