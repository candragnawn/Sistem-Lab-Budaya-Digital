<?php

namespace App\Http\Resources\PelaksanaanPendidikan;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DetaseringResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'jenis_detasering' => $this->activity_category ?? null,
            'perguruan_tinggi_mitra' => $this->target_university ?? null,
            'nama_program' => $this->program_name ?? null,
            'tmt' => $this->decree_date ?? $this->start_date ?? null,
            'tst' => $this->end_date ?? null,
        ];
    }
}
