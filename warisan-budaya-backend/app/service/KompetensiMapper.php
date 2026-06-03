<?php

namespace App\service;

use App\Models\Lecturer;
use App\Models\Kompetensi\Certification;
use App\Models\Kompetensi\Test;

class KompetensiMapper
{
    public function mapCertification(Lecturer $lecturer, array $data): void
    {
        foreach ($data as $cert) {
            Certification::updateOrCreate(
                [
                    'lecturer_id' => $lecturer->id,
                    'name' => $cert['nama_sertifikasi'] ?? null,
                    'year' => $cert['tahun'] ?? null,
                ],
                [
                    'certification_type' => $cert['jenis_sertifikasi'] ?? null,
                    'organizer' => $cert['penyelenggara'] ?? null,
                    'certificate_number' => $cert['nomor_sertifikat'] ?? null,
                ]
            );
        }
    }

    public function mapTest(Lecturer $lecturer, array $data): void
    {
        foreach ($data as $test) {
            Test::updateOrCreate(
                [
                    'lecturer_id' => $lecturer->id,
                    'name' => $test['nama_tes'] ?? null,
                    'year' => $test['tahun'] ?? null,
                ],
                [
                    'test_type' => $test['jenis_tes'] ?? null,
                    'organizer' => $test['penyelenggara'] ?? null,
                    'score' => $test['skor'] ?? null,
                ]
            );
        }
    }
}
