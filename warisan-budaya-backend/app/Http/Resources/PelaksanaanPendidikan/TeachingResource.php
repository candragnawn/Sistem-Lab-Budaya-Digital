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
            'nama_mata_kuliah' => $this->course_name,
            'jenis_mata_kuliah' => $this->course_type,
            'bidang_ilmu' => $this->scientific_field,
            'kelas' => $this->class,
            'jumlah_mahasiswa' => $this->student_count,
            'sks' => $this->credits,
        ];
    }
}
