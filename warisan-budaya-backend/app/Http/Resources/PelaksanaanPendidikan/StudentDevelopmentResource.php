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
            'activity_category' => $this->activity_category,
            'guidance_title' => $this->guidance_title,
            'guidance_type' => $this->guidance_type,
            'study_program' => $this->study_program,
        ];
    }
}
