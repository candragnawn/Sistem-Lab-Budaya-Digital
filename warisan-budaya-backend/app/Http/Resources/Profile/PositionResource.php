<?php

namespace App\Http\Resources\Profile;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PositionResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nama_jabatan' => $this->functional_position,
            'nomor_sk' => $this->decree_number,
            'tanggal_sk' => $this->decree_date,
            'tmt' => $this->effective_date,
        ];
    }
}
