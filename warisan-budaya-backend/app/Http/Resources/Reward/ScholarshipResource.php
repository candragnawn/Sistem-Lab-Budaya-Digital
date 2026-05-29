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
            'jenis_beasiswa' => $this->scholarship_type,
            'nama_beasiswa' => $this->scholarship_name,
            'tahun_mulai' => $this->start_year,
            'tahun_selesai' => $this->end_year,
            'status_aktif' => $this->is_active,
        ];
    }
}
