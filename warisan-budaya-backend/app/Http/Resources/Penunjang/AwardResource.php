<?php

namespace App\Http\Resources\Penunjang;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AwardResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nama_penghargaan' => $this->award_name,
            'jenis_penghargaan' => $this->award_type,
            'institusi' => $this->institution,
            'tahun' => $this->year,
        ];
    }
}
