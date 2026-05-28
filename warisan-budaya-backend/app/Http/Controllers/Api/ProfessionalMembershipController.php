<?php

namespace App\Http\Controllers\Api;

class ProfessionalMembershipController extends BaseCrudController
{
    protected $model = \App\Models\Penunjang\ProfessionalMembership::class;
    protected $storeRequest = "App\\Http\\Requests\\Penunjang\\StoreProfessionalMembershipRequest";
    protected $updateRequest = "App\\Http\\Requests\\Penunjang\\UpdateProfessionalMembershipRequest";
    protected $resource = "App\\Http\\Resources\\Penunjang\\ProfessionalMembershipResource";
}
