<?php

namespace App\Http\Resources\Penunjang;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class OtherSupportingActivityResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nama_kegiatan' => $this->activity_name ?? null,
            'peran_kedudukan' => $this->role ?? null,
            'tempat_pelaksanaan' => $this->location ?? null,
            'tanggal_pelaksanaan' => $this->start_date ?? $this->date ?? null,
        ];
    }
}
