<?php

namespace App\Http\Resources\PelaksanaanPenelitian;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class HKIResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'hki_type' => $this->hki_type,
            'title' => $this->title,
            'certificate_number' => $this->certificate_number,
            'issue_date' => $this->issue_date,
            'description' => $this->description,
        ];
    }
}
