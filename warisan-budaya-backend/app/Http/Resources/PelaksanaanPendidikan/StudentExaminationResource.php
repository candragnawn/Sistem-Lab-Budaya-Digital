<?php

namespace App\Http\Resources\PelaksanaanPendidikan;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StudentExaminationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'judul_ujian' => $this->examination_title,
            'bidang_ilmu' => $this->scientific_field,
            'jenis_ujian' => $this->examination_type,
            'program_studi' => $this->study_program,
        ];
    }
}
