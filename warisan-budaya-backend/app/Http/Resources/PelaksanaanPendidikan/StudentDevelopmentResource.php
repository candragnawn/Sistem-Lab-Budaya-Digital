<?php

namespace App\Http\Resources\PelaksanaanPendidikan;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StudentDevelopmentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nama_kegiatan' => $this->guidance_title ?? $this->activity_name ?? null,
            'peran_pembina' => $this->role ?? $this->guidance_type ?? null,
            'kategori_kegiatan' => $this->activity_category ?? null,
            'tanggal_mulai' => $this->start_date ?? null,
            'tanggal_selesai' => $this->end_date ?? null,
        ];
    }
}
