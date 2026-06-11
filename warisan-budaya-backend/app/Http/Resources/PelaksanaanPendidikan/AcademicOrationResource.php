<?php

namespace App\Http\Resources\PelaksanaanPendidikan;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AcademicOrationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nama_pertemuan_ilmiah' => $this->activity_category ?? null,
            'judul_orasi' => $this->paper_title ?? null,
            'penyelenggara' => $this->organizer ?? null,
            'tanggal_pelaksanaan' => $this->activity_date ?? null,
        ];
    }
}
