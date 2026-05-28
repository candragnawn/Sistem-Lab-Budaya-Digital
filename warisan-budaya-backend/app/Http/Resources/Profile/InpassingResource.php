<?php

namespace App\Http\Resources\Profile;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InpassingResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'rank_group' => $this->rank_group,
            'decree_number' => $this->decree_number,
            'effective_date' => $this->effective_date,
            'notes' => $this->notes,
        ];
    }
}
