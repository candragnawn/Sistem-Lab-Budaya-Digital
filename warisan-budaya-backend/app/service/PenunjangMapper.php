<?php

namespace App\service;

use App\Models\Lecturer;
use App\Models\Penunjang\Award;
use App\Models\Penunjang\OtherSupportingActivity;
use App\Models\Penunjang\ProfessionalMembership;

class PenunjangMapper
{
    public function mapAward(Lecturer $lecturer, array $data): void
    {
        foreach ($data as $award) {
            Award::updateOrCreate(
                [
                    'lecturer_id' => $lecturer->id,
                    'award_name' => $award['nama_penghargaan'] ?? null,
                    'year' => $award['tahun'] ?? null,
                ],
                [
                    'award_type' => $award['jenis_penghargaan'] ?? null,
                    'institution' => $award['institusi_pemberi'] ?? null,
                ]
            );
        }
    }

    public function mapOtherSupportingActivity(Lecturer $lecturer, array $data): void
    {
        foreach ($data as $activity) {
            OtherSupportingActivity::updateOrCreate(
                [
                    'lecturer_id' => $lecturer->id,
                    'activity_name' => $activity['nama_kegiatan'] ?? null,
                    'year' => $activity['tahun'] ?? null,
                ],
                [
                    'role' => $activity['peran'] ?? null,
                    'organizer' => $activity['penyelenggara'] ?? null,
                ]
            );
        }
    }

    public function mapProfessionalMembership(Lecturer $lecturer, array $data): void
    {
        foreach ($data as $membership) {
            ProfessionalMembership::updateOrCreate(
                [
                    'lecturer_id' => $lecturer->id,
                    'organization' => $membership['nama_organisasi'] ?? null,
                    'year' => $membership['tahun'] ?? null,
                ],
                [
                    'role' => $membership['peran'] ?? null,
                    'level' => $membership['tingkat'] ?? null,
                ]
            );
        }
    }
}
