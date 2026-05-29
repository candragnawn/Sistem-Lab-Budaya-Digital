<?php

namespace App\Http\Resources\Profile;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class InpassingResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'golongan_kepangkatan' => $this->rank_group,
            'nomor_sk' => $this->decree_number,
            'tanggal_berlaku' => $this->effective_date,
            'catatan' => $this->notes,
        ];
    }
}
