<?php

namespace App\Http\Resources\PelaksanaanPengabdian;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class StructuralPositionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'jabatan_struktural' => $this->position_name ?? $this->structural_position ?? null,
            'unit_kerja' => $this->work_unit ?? null,
            'perguruan_tinggi' => $this->university ?? null,
            'tmt' => $this->start_date ?? null,
            'tst' => $this->end_date ?? null,
        ];
    }
}
