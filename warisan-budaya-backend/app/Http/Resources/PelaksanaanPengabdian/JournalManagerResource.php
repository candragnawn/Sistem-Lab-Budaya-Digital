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
            'journal_name' => $this->journal_name,
            'decree_number' => $this->decree_number,
            'effective_date' => $this->effective_date,
            'end_date' => $this->end_date,
            'is_active' => $this->is_active,
            'role' => $this->role,
        ];
    }
}
