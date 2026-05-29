<?php

namespace App\Http\Resources\PelaksanaanPendidikan;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AdditionalTaskResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'tugas_tambahan' => $this->additional_task,
            'unit_kerja' => $this->work_unit,
            'institusi' => $this->institution,
            'tanggal_mulai' => $this->start_date,
            'tanggal_selesai' => $this->end_date,
        ];
    }
}
