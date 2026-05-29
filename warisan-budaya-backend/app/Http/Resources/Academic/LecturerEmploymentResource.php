<?php
namespace App\Http\Resources\Academic;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LecturerEmploymentResource extends JsonResource
{
    public function toArray(Request $request): array
    {
        return [
            "id" => $this -> id,
            "lecturer_id" => $this -> lecturer_id,
            'nip' => $this -> nip,
            'nomor_sk_cpns' => $this -> sk_cpns_number,
            'tanggal_sk_cpns' => $this -> sk_cpns_date,
            'golongan_kepangkatan' => $this -> rank_group,
            'tanggal_sk' => $this -> sk_date,
            'tahun_kerja' => $this -> work_years,
            'bulan_kerja' => $this -> work_months,
            'status_kepegawaian' => $this -> employment_status,
            'status_aktif' => $this -> active_status,
        ];
    }
}
