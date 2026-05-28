<?php

namespace App\Http\Resources\Reward;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class WelfareResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'welfare_type' => $this->welfare_type,
            'welfare_service' => $this->welfare_service,
            'organizer' => $this->organizer,
            'start_year' => $this->start_year,
            'selection_year' => $this->selection_year,
        ];
    }
}
