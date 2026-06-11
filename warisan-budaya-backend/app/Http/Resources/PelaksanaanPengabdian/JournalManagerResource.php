<?php

namespace App\Http\Resources\PelaksanaanPengabdian;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class JournalManagerResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'nama_jurnal' => $this->journal_name ?? null,
            'peran_editor_reviewer' => $this->role ?? null,
            'penerbit' => $this->publisher ?? null,
            'tmt' => $this->start_date ?? null,
            'tst' => $this->end_date ?? null,
        ];
    }
}
