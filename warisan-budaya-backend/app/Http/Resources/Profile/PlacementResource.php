<?php

namespace App\Http\Resources\Profile;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PlacementResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'status' => $this->status,
            'ikatan_kerja' => $this->employment_bond,
            'jenjang_pendidikan' => $this->education_level,
            'unit' => $this->unit,
            'universitas' => $this->university,
            'tanggal_mulai' => $this->start_date,
            'tanggal_keluar' => $this->exit_date,
            'tanggal_selesai' => $this->end_date,
            'tempat_penugasan' => $this->assignment_homebase,
        ];
    }
}
