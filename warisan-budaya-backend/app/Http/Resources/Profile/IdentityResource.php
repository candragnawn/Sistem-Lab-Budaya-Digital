<?php

namespace App\Http\Resources\Profile;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class IdentityResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nik' => $this->nik,
            'religion' => $this->religion,
            'citizenship' => $this->citizenship,
            'npwp' => $this->npwp,
        ];
    }
}
