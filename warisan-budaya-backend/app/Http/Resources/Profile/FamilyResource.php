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
            'status_pernikahan' => $this->marital_status,
            'nama_pasangan' => $this->spouse_name,
            'nip_pasangan' => $this->spouse_nip,
            'pekerjaan_pasangan' => $this->spouse_occupation,
        ];
    }
}
