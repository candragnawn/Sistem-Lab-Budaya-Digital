<?php

namespace App\Http\Resources\Profile;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OtherDataResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'data_key' => $this->data_key,
            'data_value' => $this->data_value,
            'notes' => $this->notes,
        ];
    }
}
