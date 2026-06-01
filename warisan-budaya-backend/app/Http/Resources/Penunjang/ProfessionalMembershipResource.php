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
            'nama_organisasi' => $this->organization_name,
            'peran' => $this->role,
            'awal_keanggotaan' => $this->membership_start,
            'akhir_keanggotaan' => $this->membership_end,
            'institusi_profesional' => $this->professional_institution,
        ];
    }
}
