<?php

namespace App\Http\Resources\Kompetensi;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class certificationResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'certification_type' => $this->certification_type,
            'study_type' => $this->study_type,
            'educator_registration_number' => $this->educator_registration_number,
            'certificate_sk_number' => $this->certificate_sk_number,
            'certification_year' => $this->certification_year,
        ];
    }
}
