<?php

namespace App\Http\Controllers\Api;

use App\Models\Event;
use App\Http\Requests\Master\StoreEventRequest;
use App\Http\Requests\Master\UpdateEventRequest;
use App\Http\Resources\EventResource;

class EventController extends BaseCrudController
{
    protected $model = Event::class;
    protected $resource = EventResource::class;
    protected $storeRequest = StoreEventRequest::class;
    protected $updateRequest = UpdateEventRequest::class;
    protected $with = ['lecturer'];
}
