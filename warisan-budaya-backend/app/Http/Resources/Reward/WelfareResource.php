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
            'jenis_kesejahteraan' => $this->welfare_type,
            'layanan_kesejahteraan' => $this->welfare_service,
            'penyelenggara' => $this->organizer,
            'tahun_mulai' => $this->start_year,
            'tahun_seleksi' => $this->selection_year,
        ];
    }
}
