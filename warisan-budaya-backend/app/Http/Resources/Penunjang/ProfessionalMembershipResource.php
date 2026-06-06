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
            'nama_organisasi' => $this->organization_name ?? null,
            'peran_jabatan' => $this->role ?? null,
            'mulai_keanggotaan' => $this->start_year ?? $this->start_date ?? null,
            'selesai_keanggotaan' => $this->end_year ?? $this->end_date ?? null,
        ];
    }
}
