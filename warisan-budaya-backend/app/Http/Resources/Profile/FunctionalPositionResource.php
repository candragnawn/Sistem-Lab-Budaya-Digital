<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FunctionalPositionResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'id_dosen' => $this->lecturer_id,
            'jabatan_fungsional' => $this->functional_position,
            'nomor_sk' => $this->decree_number,
            'tanggal_sk' => $this->decree_date?->format('Y-m-d'),
            'tanggal_mulai_berlaku' => $this->effective_date?->format('Y-m-d'),
            'status_kepegawaian' => $this->civil_servant_status,
            'tanggal_dibuat' => $this->created_at?->format('Y-m-d H:i:s'),
            'tanggal_diubah' => $this->updated_at?->format('Y-m-d H:i:s'),
            'dosen' => $this->whenLoaded('lecturer', function () {
                return [
                    'id' => $this->lecturer->id,
                    'nama' => $this->lecturer->name,
                ];
            }),
        ];
    }
}