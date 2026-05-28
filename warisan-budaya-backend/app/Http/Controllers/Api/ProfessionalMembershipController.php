<?php

namespace App\Http\Controllers\Api;


use App\Models\Penunjang\ProfessionalMembership;
use App\Http\Requests\Penunjang\StoreProfessionalMembershipRequest;
use App\Http\Requests\Penunjang\UpdateProfessionalMembershipRequest;
use App\Http\Resources\Penunjang\ProfessionalMembershipResource;

class ProfessionalMembershipController extends BaseCrudController
{
    protected $model = ProfessionalMembership::class;
    protected $resource = ProfessionalMembershipResource::class;
    protected $storeRequest = StoreProfessionalMembershipRequest::class;
    protected $updateRequest = UpdateProfessionalMembershipRequest::class;
    protected $with = ['lecturer'];
}
