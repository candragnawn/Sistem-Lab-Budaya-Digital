<?php

namespace App\Http\Resources\Master;

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
        'photo_url' => $this->photo_url,
        'status_aktif' => $this->status,
        'birth_date' => $this->birth_date?->format('Y-m-d'),
        'created_at' => $this->created_at?->format('Y-m-d H:i:s'),

        // Stats — hanya muncul kalau relasi stats di-load
        'statistik' => $this->when($this->relationLoaded('stats'), function () {
            return [
                'jurnal' => $this->stats->jurnal_count ?? 0,
                'buku' => $this->stats->buku_count ?? 0,
                'hki' => $this->stats->hki_count ?? 0,
                'pengabdian' => $this->stats->pengabdian_count ?? 0,
            ];
        }),

        // Count relations — ?with_count=publications,teachings
        'publications_count' => $this->whenCounted('publications'),
        'teachings_count' => $this->whenCounted('teachings'),

        // Relations — hanya muncul jika di-request via ?include=
        'riwayat_pendidikan' => $this->whenLoaded('education'),
        'riwayat_golongan' => $this->whenLoaded('ranks'),
        'riwayat_belajar' => $this->whenLoaded('studies'),
        'riwayat_jabatan' => $this->whenLoaded('positions'),
        'riwayat_ikatan_kerja' => $this->whenLoaded('workContracts'),
        'riwayat_mengajar' => $this->whenLoaded('teachings'),
        'publikasi' => $this->whenLoaded('publications'),
        'keluarga' => $this->whenLoaded('families'),
        'penelitian' => $this->whenLoaded('research'),

        ];
    }
}
