<?php

namespace App\Http\Resources\PelaksanaanPengabdian;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SpeakerResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'activity_category' => $this->activity_category,
            'paper_title' => $this->paper_title,
            'guest_lecturer_name' => $this->guest_lecturer_name,
            'organizer' => $this->organizer,
            'activity_date' => $this->activity_date,
        ];
    }
}
