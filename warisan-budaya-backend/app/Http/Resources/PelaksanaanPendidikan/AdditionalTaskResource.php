<?php

namespace App\Http\Resources\PelaksanaanPendidikan;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AdditionalTaskResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'tugas_tambahan' => $this->task_name ?? null,
            'unit_kerja' => $this->work_unit ?? null,
            'perguruan_tinggi' => $this->university ?? null,
            'tmt_tugas' => $this->start_date ?? null,
            'tst_tugas' => $this->end_date ?? null,
            'nomor_sk' => $this->decree_number ?? $this->sk_number ?? null,
        ];
    }
}
