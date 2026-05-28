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
            'examination_title' => $this->examination_title,
            'scientific_field' => $this->scientific_field,
            'examination_type' => $this->examination_type,
            'study_program' => $this->study_program,
        ];
    }
}
