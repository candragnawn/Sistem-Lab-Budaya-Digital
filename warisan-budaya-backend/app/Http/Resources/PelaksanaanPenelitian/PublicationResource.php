<?php

namespace App\Http\Resources\PelaksanaanPenelitian;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PublicationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'judul' => $this->title,
            'kategori' => $this->category,
            'tipe' => $this->type,
            'sumber' => $this->source,
            'kuartil' => $this->quartile,
            'nama_jurnal' => $this->journal_name,
            'issn' => $this->issn,
            'doi' => $this->doi,
            'status_verifikasi' => $this->is_verified,
            'tahun' => $this->year,
            'url' => $this->url ? (str_starts_with($this->url, 'http') ? $this->url : asset('storage/' . $this->url)) : null,
        ];
    }
}
