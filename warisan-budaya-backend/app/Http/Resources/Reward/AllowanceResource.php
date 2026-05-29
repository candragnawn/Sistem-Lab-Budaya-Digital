<?php

namespace App\Http\Resources\Reward;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AllowanceResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'jenis_tunjangan' => $this->allowance_type,
            'nama_tunjangan' => $this->allowance_name,
            'institusi_pemberi' => $this->granting_institution,
            'sumber_dana' => $this->funding_source,
            'tahun_mulai' => $this->start_year,
            'tahun_selesai' => $this->end_year,
            'jumlah' => $this->amount,
        ];
    }
}
