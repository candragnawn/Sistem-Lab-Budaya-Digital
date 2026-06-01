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
            'nama_kegiatan' => $this->activity_name,
            'institusi_penyelenggara' => $this->organizing_institution,
            'nomor_sk' => $this->decree_number,
            'tanggal_mulai' => $this->start_date,
            'tanggal_selesai' => $this->end_date,
            'peran' => $this->role,
        ];
    }
}
