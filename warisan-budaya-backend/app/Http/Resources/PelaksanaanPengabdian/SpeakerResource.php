<?php

namespace App\Http\Resources\PelaksanaanPengabdian;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SpeakerResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nama_pertemuan_ilmiah' => $this->event_name ?? $this->activity_category ?? null,
            'judul_makalah' => $this->paper_title ?? null,
            'penyelenggara' => $this->organizer ?? null,
            'waktu_pelaksanaan' => $this->activity_date ?? $this->date ?? null,
        ];
    }
}
