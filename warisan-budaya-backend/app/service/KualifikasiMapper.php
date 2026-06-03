<?php

namespace App\service;

use App\Models\Lecturer;
use App\Models\Kualifikasi\Diklat;
use App\Models\Kualifikasi\LecturerEducation;
use App\Models\Kualifikasi\Employment;

class KualifikasiMapper
{
    public function mapEducation(Lecturer $lecturer, array $data): void
    {
        foreach ($data as $edu) {
            LecturerEducation::updateOrCreate(
                [
                    'lecturer_id' => $lecturer->id,
                    'degree' => $edu['gelar_akademik'] ?? null,
                    'institution' => $edu['perguruan_tinggi'] ?? null,
                    'graduation_year' => $edu['tahun_lulus'] ?? null,
                ],
                [
                    'study_program' => $edu['program_studi'] ?? null,
                    'entry_year' => $edu['tahun_masuk'] ?? null,
                ]
            );
        }
    }

    public function mapEmployment(Lecturer $lecturer, array $data): void
    {
        foreach ($data as $emp) {
            Employment::updateOrCreate(
                [
                    'lecturer_id' => $lecturer->id,
                    'institution' => $emp['instansi'] ?? null,
                    'position' => $emp['jabatan'] ?? null,
                    'start_year' => $emp['tahun_mulai'] ?? null,
                ],
                [
                    'end_year' => $emp['tahun_selesai'] ?? null,
                    'description' => $emp['deskripsi'] ?? null,
                ]
            );
        }
    }

    public function mapDiklat(Lecturer $lecturer, array $data): void
    {
        foreach ($data as $diklat) {
            Diklat::updateOrCreate(
                [
                    'lecturer_id' => $lecturer->id,
                    'name' => $diklat['nama_diklat'] ?? null,
                    'year' => $diklat['tahun'] ?? null,
                ],
                [
                    'organizer' => $diklat['penyelenggara'] ?? null,
                    'role' => $diklat['peran'] ?? null,
                ]
            );
        }
    }
}
