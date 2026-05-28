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
            'activity_category' => $this->activity_category,
            'supervision_type' => $this->supervision_type,
            'scientific_field' => $this->scientific_field,
            'study_program' => $this->study_program,
        ];
    }
}
