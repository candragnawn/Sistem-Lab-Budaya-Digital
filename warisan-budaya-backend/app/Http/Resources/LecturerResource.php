<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class LecturerResource extends JsonResource
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
        'nama_lengkap' => $this->title_prefix . ' ' . $this->name . ', ' . $this->title_suffix,
        'nip' => $this->nip,
        'email' => $this->email,
        'bio' => $this->bio,
        'status_aktif' => $this->status,

        'riwayat_pendidikan' => $this->whenLoaded('education'),
        'riwayat_golongan' => $this->whenLoaded('ranks'),
        'riwayat_belajar' => $this->whenLoaded9('studies'),
        'riwayat_jabatan' => $this->whenLoaded('positions'),
        'riwayat_ikatan_kerja' => $this->whenLoaded('workContracts'),
        'riwayat_mengajar' => $this->whenLoaded('teachings'),
        'publikasi' => $this->whenLoaded('publications'),
            
        ];
    }
}
