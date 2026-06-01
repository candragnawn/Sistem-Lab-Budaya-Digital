<?php

namespace App\Http\Resources\PelaksanaanPendidikan;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class DetaseringResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'universitas_tujuan' => $this->target_university,
            'kategori_kegiatan' => $this->activity_category,
            'nomor_sk_penugasan' => $this->assignment_decree_number,
            'tanggal_sk' => $this->decree_date,
        ];
    }
}
