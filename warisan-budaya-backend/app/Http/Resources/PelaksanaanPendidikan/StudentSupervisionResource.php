<?php

namespace App\Http\Resources\PelaksanaanPendidikan;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StudentSupervisionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'semester' => $this->semester,
            'kategori_kegiatan' => $this->activity_category,
            'jenis_bimbingan' => $this->supervision_type,
            'bidang_ilmu' => $this->scientific_field,
            'program_studi' => $this->study_program,
        ];
    }
}
