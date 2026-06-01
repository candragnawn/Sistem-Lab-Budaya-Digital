<?php

namespace App\Http\Resources\PelaksanaanPendidikan;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StudentDevelopmentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'semester' => $this->semester,
            'kategori_kegiatan' => $this->activity_category,
            'judul_bimbingan' => $this->guidance_title,
            'jenis_bimbingan' => $this->guidance_type,
            'program_studi' => $this->study_program,
        ];
    }
}
