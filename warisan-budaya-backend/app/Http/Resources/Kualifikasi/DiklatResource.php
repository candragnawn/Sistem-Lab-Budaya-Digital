<?php

namespace App\Http\Resources\Kualifikasi;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class diklatResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'training_name' => $this->training_name,
            'training_type' => $this->training_type,
            'organizer' => $this->organizer,
            'year' => $this->year,
            'status' => $this->status,
        ];
    }
}
