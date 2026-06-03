<?php

namespace App\service;

use App\Models\Lecturer;
use App\Models\Profile\Identity;
use App\Models\Profile\Address;
use App\Models\Profile\Position;
use App\Models\Profile\Placement;
use App\Models\Profile\Rank;
use App\Models\Profile\Inpassing;
use App\Models\Profile\WorkContract;

class ProfileMapper
{
    public function mapProfile(Lecturer $lecturer, array $data): void
    {
        $lecturer->update([
            'name' => $data['nama'] ?? $lecturer->name,
            'title_prefix' => $data['gelar_depan'] ?? $lecturer->title_prefix,
            'title_suffix' => $data['gelar_belakang'] ?? $lecturer->title_suffix,
            'status' => $data['status_keaktifan'] ?? $lecturer->status,
        ]);
    }

    public function mapIdentity(Lecturer $lecturer, array $data): void
    {
        if (empty($data)) return;
        
        Identity::updateOrCreate(
            ['lecturer_id' => $lecturer->id],
            [
                'nik' => $data['nik'] ?? null,
                'religion' => $data['agama'] ?? null,
                'citizenship' => $data['kewarganegaraan'] ?? null,
                'npwp' => $data['npwp'] ?? null,
            ]
        );
    }

    public function mapAddress(Lecturer $lecturer, array $data): void
    {
        foreach ($data as $address) {
            Address::updateOrCreate(
                [
                    'lecturer_id' => $lecturer->id,
                    'address_type' => $address['jenis_alamat'] ?? 'Domisili'
                ],
                [
                    'address_line_1' => $address['jalan'] ?? null,
                    'city' => $address['kota_kabupaten'] ?? null,
                    'postal_code' => $address['kode_pos'] ?? null,
                    'province' => $address['provinsi'] ?? null,
                ]
            );
        }
    }

    public function mapFunctionalPosition(Lecturer $lecturer, array $data): void
    {
        foreach ($data as $position) {
            Position::updateOrCreate(
                [
                    'lecturer_id' => $lecturer->id,
                    'position_name' => $position['nama_jabatan'] ?? null,
                    'start_date' => $position['tanggal_mulai'] ?? null,
                ],
                [
                    'decree_number' => $position['nomor_sk'] ?? null,
                    'decree_date' => $position['tanggal_sk'] ?? null,
                ]
            );
        }
    }

    public function mapPlacement(Lecturer $lecturer, array $data): void
    {
        foreach ($data as $placement) {
            Placement::updateOrCreate(
                [
                    'lecturer_id' => $lecturer->id,
                    'unit' => $placement['unit_kerja'] ?? null,
                    'start_date' => $placement['tanggal_mulai'] ?? null,
                ],
                [
                    'status' => $placement['status'] ?? null,
                    'employment_bond' => $placement['ikatan_kerja'] ?? null,
                    'education_level' => $placement['jenjang_pendidikan'] ?? null,
                    'university' => $placement['perguruan_tinggi'] ?? null,
                    'exit_date' => $placement['tanggal_keluar'] ?? null,
                    'end_date' => $placement['tanggal_selesai'] ?? null,
                    'assignment_homebase' => $placement['homebase_penugasan'] ?? null,
                ]
            );
        }
    }

    public function mapRank(Lecturer $lecturer, array $data): void
    {
        foreach ($data as $rank) {
            Rank::updateOrCreate(
                [
                    'lecturer_id' => $lecturer->id,
                    'rank' => $rank['golongan_pangkat'] ?? null,
                    'start_date' => $rank['tanggal_mulai'] ?? null,
                ],
                [
                    'decree_number' => $rank['nomor_sk'] ?? null,
                    'decree_date' => $rank['tanggal_sk'] ?? null,
                ]
            );
        }
    }
}
