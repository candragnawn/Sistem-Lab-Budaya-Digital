<?php

namespace App\Http\Resources\Profile;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PositionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'position_name' => $this->position_name,
            'sk_number' => $this->sk_number,
            'sk_date' => $this->sk_date,
            'tmt' => $this->tmt,
        ];
    }
}
