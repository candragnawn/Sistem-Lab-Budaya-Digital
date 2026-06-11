<?php

namespace App\Http\Resources\PelaksanaanPendidikan;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TeachingResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'mata_kuliah' => $this->course_name ?? null,
            'kelas' => $this->class ?? null,
            'jenis_evaluasi' => $this->course_type ?? null,
            'sks_kuliah' => $this->credits ?? null,
            'sks_tatap_muka' => null,
            'sks_praktikum' => null,
            'sks_praktek_lapangan' => null,
            'sks_simulasi' => null,
            'semester' => $this->semester ?? null,
        ];
    }
}
