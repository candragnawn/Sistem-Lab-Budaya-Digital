<?php

namespace App\Http\Resources\Reward;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ScholarshipResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'scholarship_type' => $this->scholarship_type,
            'scholarship_name' => $this->scholarship_name,
            'start_year' => $this->start_year,
            'end_year' => $this->end_year,
            'is_active' => $this->is_active,
        ];
    }
}
