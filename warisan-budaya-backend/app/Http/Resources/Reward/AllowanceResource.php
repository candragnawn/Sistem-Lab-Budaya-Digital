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
            'jenis_tunjangan' => $this->allowance_type ?? null,
            'nomor_sk' => $this->sk_number ?? $this->decree_number ?? null,
            'sumber_dana' => $this->funding_source ?? null,
            'besar_tunjangan' => $this->amount ?? null,
            'status_pembayaran' => $this->payment_status ?? null,
        ];
    }
}
