<?php

namespace App\Http\Resources\Reward;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class WelfareResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'jenis_kesejahteraan' => $this->welfare_type ?? null,
            'penyelenggara' => $this->provider ?? $this->organizer ?? null,
            'nomor_kartu' => $this->card_number ?? null,
            'status_aktif' => $this->is_active ?? null,
        ];
    }
}
