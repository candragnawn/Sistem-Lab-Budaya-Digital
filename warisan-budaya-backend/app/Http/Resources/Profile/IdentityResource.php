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
            'agama' => $this->religion,
            'kewarganegaraan' => $this->citizenship,
            'npwp' => $this->npwp,
        ];
    }
}
