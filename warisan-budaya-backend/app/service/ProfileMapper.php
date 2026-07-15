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
        $updates = [];
        if (empty($lecturer->name) && isset($data['nama'])) $updates['name'] = $data['nama'];
        if (empty($lecturer->title_prefix) && isset($data['gelar_depan'])) $updates['title_prefix'] = $data['gelar_depan'];
        if (empty($lecturer->title_suffix) && isset($data['gelar_belakang'])) $updates['title_suffix'] = $data['gelar_belakang'];
        if (empty($lecturer->status) && isset($data['status_keaktifan'])) $updates['status'] = $data['status_keaktifan'];

        if (!empty($updates)) {
            $lecturer->update($updates);
        }
    }

    public function mapIdentity(Lecturer $lecturer, array $data): void
    {
        if (empty($data)) return;
        
        $identity = Identity::firstOrNew(['lecturer_id' => $lecturer->id]);
        
        // Anti-Overwrite Logic
        if (empty($identity->nik) && isset($data['nik'])) $identity->nik = $data['nik'];
        if (empty($identity->religion) && isset($data['agama'])) $identity->religion = $data['agama'];
        if (empty($identity->citizenship) && isset($data['kewarganegaraan'])) $identity->citizenship = $data['kewarganegaraan'];
        if (empty($identity->npwp) && isset($data['npwp'])) $identity->npwp = $data['npwp'];

        if ($identity->isDirty()) {
            $identity->save();
        }
    }

    public function mapAddress(Lecturer $lecturer, array $data): void
    {
        foreach ($data as $addressData) {
            $address = Address::firstOrNew([
                'lecturer_id' => $lecturer->id,
                'address_type' => $addressData['jenis_alamat'] ?? 'Domisili'
            ]);

            // Anti-Overwrite Logic
            if (empty($address->address_line_1) && isset($addressData['jalan'])) $address->address_line_1 = $addressData['jalan'];
            if (empty($address->city) && isset($addressData['kota_kabupaten'])) $address->city = $addressData['kota_kabupaten'];
            if (empty($address->postal_code) && isset($addressData['kode_pos'])) $address->postal_code = $addressData['kode_pos'];
            if (empty($address->province) && isset($addressData['provinsi'])) $address->province = $addressData['provinsi'];

            if ($address->isDirty()) {
                $address->save();
            }
        }
    }

    public function mapFunctionalPosition(Lecturer $lecturer, array $data): void
    {
        foreach ($data as $positionData) {
            $position = Position::firstOrNew([
                'lecturer_id' => $lecturer->id,
                'position_name' => $positionData['nama_jabatan'] ?? null,
                'start_date' => $positionData['tanggal_mulai'] ?? null,
            ]);

            if (empty($position->decree_number) && isset($positionData['nomor_sk'])) $position->decree_number = $positionData['nomor_sk'];
            if (empty($position->decree_date) && isset($positionData['tanggal_sk'])) $position->decree_date = $positionData['tanggal_sk'];

            if ($position->isDirty()) {
                $position->save();
            }
        }
    }

    public function mapPlacement(Lecturer $lecturer, array $data): void
    {
        foreach ($data as $placementData) {
            $placement = Placement::firstOrNew([
                'lecturer_id' => $lecturer->id,
                'unit' => $placementData['unit_kerja'] ?? null,
                'start_date' => $placementData['tanggal_mulai'] ?? null,
            ]);

            if (empty($placement->status) && isset($placementData['status'])) $placement->status = $placementData['status'];
            if (empty($placement->employment_bond) && isset($placementData['ikatan_kerja'])) $placement->employment_bond = $placementData['ikatan_kerja'];
            if (empty($placement->education_level) && isset($placementData['jenjang_pendidikan'])) $placement->education_level = $placementData['jenjang_pendidikan'];
            if (empty($placement->university) && isset($placementData['perguruan_tinggi'])) $placement->university = $placementData['perguruan_tinggi'];
            if (empty($placement->exit_date) && isset($placementData['tanggal_keluar'])) $placement->exit_date = $placementData['tanggal_keluar'];
            if (empty($placement->end_date) && isset($placementData['tanggal_selesai'])) $placement->end_date = $placementData['tanggal_selesai'];
            if (empty($placement->assignment_homebase) && isset($placementData['homebase_penugasan'])) $placement->assignment_homebase = $placementData['homebase_penugasan'];

            if ($placement->isDirty()) {
                $placement->save();
            }
        }
    }

    public function mapRank(Lecturer $lecturer, array $data): void
    {
        foreach ($data as $rankData) {
            $rank = Rank::firstOrNew([
                'lecturer_id' => $lecturer->id,
                'rank' => $rankData['golongan_pangkat'] ?? null,
                'start_date' => $rankData['tanggal_mulai'] ?? null,
            ]);

            if (empty($rank->decree_number) && isset($rankData['nomor_sk'])) $rank->decree_number = $rankData['nomor_sk'];
            if (empty($rank->decree_date) && isset($rankData['tanggal_sk'])) $rank->decree_date = $rankData['tanggal_sk'];

            if ($rank->isDirty()) {
                $rank->save();
            }
        }
    }
}
