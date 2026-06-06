<?php

namespace App\Http\Resources\PelaksanaanPendidikan;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StudentSupervisionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'judul_aktivitas' => $this->title ?? $this->activity_title ?? null,
            'jenis_aktivitas' => $this->supervision_type ?? null,
            'kategori_kegiatan' => $this->activity_category ?? null,
            'peran_pembimbing' => $this->role ?? null,
            'tanggal_mulai' => $this->start_date ?? null,
            'tanggal_selesai' => $this->end_date ?? null,
            'status_kelulusan' => $this->status ?? null,
        ];
    }
}
