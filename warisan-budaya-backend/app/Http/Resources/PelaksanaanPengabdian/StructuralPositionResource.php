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
            'jabatan_struktural' => $this->structural_position,
            'nomor_sk' => $this->decree_number,
            'tanggal_mulai' => $this->start_date,
            'tanggal_selesai' => $this->end_date,
        ];
    }
}
