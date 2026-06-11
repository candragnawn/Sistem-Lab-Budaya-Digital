<?php

namespace App\Http\Resources\PelaksanaanPengabdian;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class CommunityServiceResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'judul_kegiatan' => $this->title ?? null,
            'kategori_kegiatan' => $this->category ?? null,
            'peran_pengabdi' => $this->role ?? null,
            'lembaga_sumber_dana' => $this->funding_source ?? null,
            'tahun_pelaksanaan' => $this->year ?? null,
        ];
    }
}
