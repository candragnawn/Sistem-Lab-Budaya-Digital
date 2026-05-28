<?php

namespace App\Http\Resources\PelaksanaanPendidikan;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VisitingScientistResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'host_university' => $this->host_university,
            'duration' => $this->duration,
            'activity_date' => $this->activity_date,
        ];
    }
}
