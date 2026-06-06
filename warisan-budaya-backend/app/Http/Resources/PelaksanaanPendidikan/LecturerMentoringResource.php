<?php

namespace App\Http\Resources\PelaksanaanPendidikan;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LecturerMentoringResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nama_dosen_binaan' => $this->mentor_name ?? $this->mentee_name ?? null,
            'tahapan_bimbingan' => $this->stage ?? null,
            'tmt' => $this->start_date ?? null,
            'tst' => $this->end_date ?? null,
        ];
    }
}
