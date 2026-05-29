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
            'nama_jabatan' => $this->position_name,
            'nomor_sk' => $this->sk_number,
            'tanggal_sk' => $this->sk_date,
            'tmt' => $this->tmt,
        ];
    }
}
