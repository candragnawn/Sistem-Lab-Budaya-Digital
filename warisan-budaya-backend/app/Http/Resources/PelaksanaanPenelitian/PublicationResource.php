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
            'id_penulis_publikasi' => $this->publication_author_id,
            'judul' => $this->title,
            'kategori' => $this->category,
            'tipe' => $this->type,
            'sumber' => $this->source,
            'kuartil' => $this->quartile,
            'url_dokumen' => $this->document_url,
            'status_verifikasi' => $this->is_verified,
            'tahun' => $this->year,
            'url' => $this->url,
        ];
    }
}
