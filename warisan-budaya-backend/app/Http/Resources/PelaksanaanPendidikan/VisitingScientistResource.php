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
            'perguruan_tinggi_tujuan' => $this->host_university ?? $this->target_university ?? null,
            'lama_kegiatan' => $this->duration ?? null,
            'kategori_kegiatan' => $this->activity_category ?? null,
            'tanggal_mulai' => $this->start_date ?? $this->activity_date ?? null,
            'tanggal_selesai' => $this->end_date ?? null,
        ];
    }
}
