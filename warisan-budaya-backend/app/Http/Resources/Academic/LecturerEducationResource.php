<?php

namespace App\Http\Resources\Academic;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LecturerEducationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'tahun_masuk' => $this->entry_year,
            'tingkat' => $this->level,
            'negara' => $this->country,
            'universitas' => $this->university,
            'program_studi' => $this->study_program,
            'jenis_studi' => $this->study_type,
            'beasiswa' => $this->scholarship,
            'tahun_lulus' => $this->graduation_year,
            'predikat' => $this->predicate
        ];
    }
}
