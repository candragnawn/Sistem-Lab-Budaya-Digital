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
            'jenis_sertifikasi' => $this->certification_type,
            'jenis_studi' => $this->study_type,
            'nomor_registrasi_pendidik' => $this->educator_registration_number,
            'nomor_sk_sertifikat' => $this->certificate_sk_number,
            'tahun_sertifikasi' => $this->certification_year,
        ];
    }
}
