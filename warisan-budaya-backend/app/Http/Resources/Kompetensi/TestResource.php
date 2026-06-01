<?php

namespace App\Http\Resources\Kompetensi;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class testResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nama_tes' => $this->test_name,
            'skor_tes' => $this->test_score,
            'penyelenggara' => $this->organizer,
            'tahun' => $this->year,
        ];
    }
}
