<?php

namespace App\Http\Resources\PelaksanaanPenelitian;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PublicationAuthorResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'judul_artikel' => $this->publication->title ?? null,
            'peran_penulis' => $this->author_position ?? $this->role ?? null,
        ];
    }
}
