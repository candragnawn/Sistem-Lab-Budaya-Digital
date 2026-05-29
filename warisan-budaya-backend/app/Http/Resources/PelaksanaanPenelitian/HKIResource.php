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
            'jenis_hki' => $this->hki_type,
            'judul' => $this->title,
            'nomor_sertifikat' => $this->certificate_number,
            'tanggal_terbit' => $this->issue_date,
            'deskripsi' => $this->description,
        ];
    }
}
