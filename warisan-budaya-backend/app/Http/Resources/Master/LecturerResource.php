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

        'statistik' => [
            'jumlah_publikasi' => $this->stats->jurnal_count ?? 0,
            'jurnal' => $this->stats->jurnal_count ?? 0,
            'buku' => $this->stats->buku_count ?? 0,
            'hki' => $this->stats->hki_count ?? 0,
            'pengabdian' => $this->stats->pengabdian_count ?? 0,
        ],

        'riwayat_pendidikan' => $this->whenLoaded('education'),
        'riwayat_golongan' => $this->whenLoaded('ranks'),
        'riwayat_belajar' => $this->whenLoaded('studies'),
        'riwayat_jabatan' => $this->whenLoaded('positions'),
        'riwayat_ikatan_kerja' => $this->whenLoaded('workContracts'),
        'riwayat_mengajar' => $this->whenLoaded('teachings'),
        'publikasi' => $this->whenLoaded('publications'),
            
        ];
    }
}
