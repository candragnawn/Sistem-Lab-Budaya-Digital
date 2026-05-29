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
            'kategori_kegiatan' => $this->activity_category,
            'judul_makalah' => $this->paper_title,
            'nama_dosen_tamu' => $this->guest_lecturer_name,
            'penyelenggara' => $this->organizer,
            'tanggal_kegiatan' => $this->activity_date,
        ];
    }
}
