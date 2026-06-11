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
            'nama_penghargaan' => $this->award_name ?? null,
            'jenis_penghargaan' => $this->award_type ?? null,
            'instansi_pemberi' => $this->institution ?? null,
            'tahun_perolehan' => $this->year ?? null,
        ];
    }
}
