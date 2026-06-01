<?php

namespace App\Http\Resources\Profile;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ProfessorEmeritusResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nama_gelar' => $this->title_name,
            'universitas' => $this->university,
            'tanggal_mulai' => $this->start_date,
            'tanggal_selesai' => $this->end_date,
        ];
    }
}
