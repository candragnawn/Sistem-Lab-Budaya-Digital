<?php

namespace App\Http\Resources\PelaksanaanPenelitian;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class HKIResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'judul_hki' => $this->title ?? null,
            'kategori_kegiatan' => $this->category ?? null,
            'jenis_hki' => $this->hki_type ?? $this->type ?? null,
            'nomor_pendaftaran' => $this->registration_number ?? null,
            'nomor_paten_sertifikat' => $this->certificate_number ?? null,
            'tanggal_terbit' => $this->publish_date ?? null,
            'status_hki' => $this->status ?? null,
        ];
    }
}
