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
            'judul' => $this->title,
            'isbn' => $this->isbn,
            'tanggal_publikasi' => $this->publication_date,
            'penerbit' => $this->publisher,
        ];
    }
}
