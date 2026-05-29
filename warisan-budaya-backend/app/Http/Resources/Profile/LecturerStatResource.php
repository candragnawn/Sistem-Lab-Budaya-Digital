<?php

namespace App\Http\Resources\Profile;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LecturerStatResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'total_publikasi' => $this->total_publications,
            'total_sitasi' => $this->total_citations,
            'total_mahasiswa' => $this->total_students,
        ];
    }
}
