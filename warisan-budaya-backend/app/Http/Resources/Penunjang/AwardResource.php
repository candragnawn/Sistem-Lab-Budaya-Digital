<?php

namespace App\Http\Resources\Penunjang;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AwardResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'award_name' => $this->award_name,
            'award_type' => $this->award_type,
            'institution' => $this->institution,
            'year' => $this->year,
        ];
    }
}
