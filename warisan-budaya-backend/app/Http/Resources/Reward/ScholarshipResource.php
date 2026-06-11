<?php

namespace App\Http\Resources\Reward;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ScholarshipResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'jenis_beasiswa' => $this->scholarship_type ?? null,
            'nama_beasiswa' => $this->scholarship_name ?? null,
            'institusi_pemberi' => $this->institution ?? null,
            'tahun_mulai' => $this->start_year ?? null,
            'tahun_selesai' => $this->end_year ?? null,
        ];
    }
}
