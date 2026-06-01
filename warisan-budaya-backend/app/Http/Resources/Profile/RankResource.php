<?php

namespace App\Http\Resources\Profile;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RankResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'kode_golongan' => $this->group_code,
            'nama_pangkat' => $this->rank_name,
            'nomor_sk' => $this->sk_number,
            'tanggal_sk' => $this->sk_date,
            'tmt' => $this->tmt,
            'tanggal_diterima' => $this->received_date,
        ];
    }
}
