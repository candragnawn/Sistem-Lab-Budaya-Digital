<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class JobResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'perusahaan_organisasi' => $this->company_name ?? $this->organization ?? $this->company ?? null,
            'jabatan_posisi' => $this->position ?? $this->job_title ?? null,
            'tanggal_mulai' => $this->start_date ?? null,
            'tanggal_selesai' => $this->end_date ?? null,
            'deskripsi_tugas' => $this->description ?? $this->task_description ?? null,
        ];
    }
}
