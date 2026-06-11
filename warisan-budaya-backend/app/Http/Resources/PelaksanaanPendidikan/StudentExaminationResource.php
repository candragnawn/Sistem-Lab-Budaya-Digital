<?php

namespace App\Http\Resources\PelaksanaanPendidikan;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StudentExaminationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'judul_aktivitas' => $this->examination_title ?? null,
            'jenis_aktivitas' => $this->examination_type ?? null,
            'kategori_kegiatan' => $this->activity_category ?? null,
            'peran_penguji' => $this->role ?? null,
            'tanggal_pelaksanaan' => $this->examination_date ?? $this->date ?? null,
        ];
    }
}
