<?php

namespace App\Http\Resources\Penunjang;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OtherSupportingActivityResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'activity_name' => $this->activity_name,
            'organizing_institution' => $this->organizing_institution,
            'decree_number' => $this->decree_number,
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
            'role' => $this->role,
        ];
    }
}
