<?php

namespace App\Http\Resources\Master;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PublicLecturerResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'faculty' => $this->faculty,
            'department' => $this->department,
            'bio' => $this->bio,
            'photo_url' => $this->photo_url,
            'publications_count' => $this->publications_count,
        ];
    }
}
