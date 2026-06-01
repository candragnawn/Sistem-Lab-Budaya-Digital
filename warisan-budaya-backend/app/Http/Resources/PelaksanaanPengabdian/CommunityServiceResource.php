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
            'judul' => $this->title,
            'bidang_ilmu' => $this->scientific_field,
            'tahun_pelaksanaan' => $this->implementation_year,
            'durasi' => $this->duration,
        ];
    }
}
