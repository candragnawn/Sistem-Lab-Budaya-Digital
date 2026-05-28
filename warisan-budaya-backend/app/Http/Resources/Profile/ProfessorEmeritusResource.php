<?php

namespace App\Http\Resources\Profile;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProfessorEmeritusResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'title_name' => $this->title_name,
            'university' => $this->university,
            'start_date' => $this->start_date,
            'end_date' => $this->end_date,
        ];
    }
}
