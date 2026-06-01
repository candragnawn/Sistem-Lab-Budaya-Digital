<?php

namespace App\Http\Controllers\Api;


use App\Models\Kompetensi\Test;
use App\Http\Requests\Kompetensi\StoreTestRequest;
use App\Http\Requests\Kompetensi\UpdateTestRequest;
use App\Http\Resources\Kompetensi\TestResource;

class TestController extends BaseCrudController
{
    protected $model = Test::class;
    protected $resource = TestResource::class;
    protected $storeRequest = StoreTestRequest::class;
    protected $updateRequest = UpdateTestRequest::class;
    protected $with = ['lecturer'];
}
