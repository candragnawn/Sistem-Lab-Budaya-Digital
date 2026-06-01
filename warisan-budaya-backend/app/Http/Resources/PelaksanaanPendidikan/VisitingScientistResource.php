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
            'universitas_penyelenggara' => $this->host_university,
            'durasi' => $this->duration,
            'tanggal_kegiatan' => $this->activity_date,
        ];
    }
}
