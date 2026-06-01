<?php

namespace App\Http\Resources\Kualifikasi;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class diklatResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nama_pelatihan' => $this->training_name,
            'jenis_pelatihan' => $this->training_type,
            'penyelenggara' => $this->organizer,
            'tahun' => $this->year,
            'status' => $this->status,
        ];
    }
}
