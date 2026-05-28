<?php

namespace App\Http\Resources\Penunjang;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProfessionalMembershipResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'organization_name' => $this->organization_name,
            'role' => $this->role,
            'membership_start' => $this->membership_start,
            'membership_end' => $this->membership_end,
            'professional_institution' => $this->professional_institution,
        ];
    }
}
