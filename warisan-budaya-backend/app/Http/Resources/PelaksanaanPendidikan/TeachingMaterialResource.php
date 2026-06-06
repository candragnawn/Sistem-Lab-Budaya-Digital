<?php

namespace App\Http\Resources\PelaksanaanPendidikan;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TeachingMaterialResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'jenis_bahan_ajar' => $this->material_type ?? null,
            'judul_bahan_ajar' => $this->title ?? null,
            'tanggal_terbit' => $this->publication_date ?? null,
            'penerbit' => $this->publisher ?? null,
        ];
    }
}
