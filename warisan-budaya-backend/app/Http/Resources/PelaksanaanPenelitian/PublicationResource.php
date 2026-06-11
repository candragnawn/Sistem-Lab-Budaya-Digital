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
            'judul_artikel' => $this->title ?? null,
            'nama_jurnal_penerbit' => $this->journal_name ?? $this->publisher ?? null,
            'kategori_kegiatan' => $this->category ?? null,
            'jenis_publikasi' => $this->publication_type ?? $this->type ?? null,
            'tanggal_terbit' => $this->publish_date ?? $this->date ?? null,
            'volume' => $this->volume ?? null,
            'nomor_jurnal' => $this->issue ?? $this->number ?? null,
            'doi' => $this->doi ?? null,
            'issn' => $this->issn ?? null,
            'peran_penulis' => $this->author_role ?? null,
            'quartile' => $this->quartile ?? null,
            'verified' => $this->is_verified ?? false,
        ];
    }
}
