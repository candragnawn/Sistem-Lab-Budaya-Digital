<?php

namespace App\Http\Resources\Kompetensi;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class testResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'test_name' => $this->test_name,
            'test_score' => $this->test_score,
            'organizer' => $this->organizer,
            'year' => $this->year,
        ];
    }
}
