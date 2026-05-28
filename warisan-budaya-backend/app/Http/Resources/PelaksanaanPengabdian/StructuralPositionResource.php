<?php

namespace App\Http\Resources\PelaksanaanPengabdian;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StructuralPositionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'structural_position' => $this->structural_position,
            'decree_number' => $this->decree_number,
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
        ];
    }
}
