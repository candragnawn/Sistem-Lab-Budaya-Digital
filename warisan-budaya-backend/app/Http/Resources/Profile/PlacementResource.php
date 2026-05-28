<?php

namespace App\Http\Resources\Profile;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PlacementResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'status' => $this->status,
            'employment_bond' => $this->employment_bond,
            'education_level' => $this->education_level,
            'unit' => $this->unit,
            'university' => $this->university,
            'start_date' => $this->start_date,
            'exit_date' => $this->exit_date,
            'end_date' => $this->end_date,
            'assignment_homebase' => $this->assignment_homebase,
        ];
    }
}
