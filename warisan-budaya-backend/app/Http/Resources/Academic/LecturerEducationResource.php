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
            'entry_year' => $this->entry_year,
            'level' => $this->level,
            'country' => $this->country,
            'university' => $this->university,
            'study_program' => $this->study_program,
            'graduation_year' => $this->graduation_year,
            'predicate' => $this->predicate
        ];
    }
}
