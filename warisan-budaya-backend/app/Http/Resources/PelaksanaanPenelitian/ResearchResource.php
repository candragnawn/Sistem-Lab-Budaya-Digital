<?php

namespace App\Http\Resources\PelaksanaanPenelitian;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ResearchResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'judul_penelitian' => $this->title ?? null,
            'kategori_kegiatan' => $this->activity_category ?? null,
            'peran_peneliti' => $this->role ?? null,
            'lembaga_sumber_dana' => $this->funding_source ?? null,
            'tahun_pelaksanaan' => $this->year ?? $this->execution_year ?? null,
            'lama_kegiatan_bulan' => $this->duration_months ?? null,
        ];
    }
}
