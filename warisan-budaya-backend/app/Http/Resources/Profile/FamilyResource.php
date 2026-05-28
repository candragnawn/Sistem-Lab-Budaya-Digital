<?php

namespace App\Http\Resources\Profile;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FamilyResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'marital_status' => $this->marital_status,
            'spouse_name' => $this->spouse_name,
            'spouse_nip' => $this->spouse_nip,
            'spouse_occupation' => $this->spouse_occupation,
        ];
    }
}
