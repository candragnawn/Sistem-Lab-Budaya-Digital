<?php

namespace App\Http\Resources\PelaksanaanPendidikan;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LecturerMentoringResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nama_pembimbing' => $this->mentor_name,
            'tanggal_mulai' => $this->start_date,
            'tanggal_selesai' => $this->end_date,
        ];
    }
}
