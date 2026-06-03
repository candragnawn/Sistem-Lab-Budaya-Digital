<?php

namespace App\service;

use App\Models\Lecturer;
use App\Models\Reward\Allowance;
use App\Models\Reward\Scholarship;
use App\Models\Reward\Welfare;

class RewardMapper
{
    public function mapAllowance(Lecturer $lecturer, array $data): void
    {
        foreach ($data as $allowance) {
            Allowance::updateOrCreate(
                [
                    'lecturer_id' => $lecturer->id,
                    'type' => $allowance['jenis_tunjangan'] ?? null,
                    'year' => $allowance['tahun'] ?? null,
                ],
                [
                    'amount' => $allowance['jumlah'] ?? null,
                    'institution' => $allowance['institusi_pemberi'] ?? null,
                ]
            );
        }
    }

    public function mapScholarship(Lecturer $lecturer, array $data): void
    {
        foreach ($data as $scholarship) {
            Scholarship::updateOrCreate(
                [
                    'lecturer_id' => $lecturer->id,
                    'name' => $scholarship['nama_beasiswa'] ?? null,
                    'year' => $scholarship['tahun_mulai'] ?? null,
                ],
                [
                    'sponsor' => $scholarship['sponsor'] ?? null,
                    'duration' => $scholarship['durasi'] ?? null,
                    'end_year' => $scholarship['tahun_selesai'] ?? null,
                ]
            );
        }
    }

    public function mapWelfare(Lecturer $lecturer, array $data): void
    {
        foreach ($data as $welfare) {
            Welfare::updateOrCreate(
                [
                    'lecturer_id' => $lecturer->id,
                    'type' => $welfare['jenis_kesejahteraan'] ?? null,
                    'year' => $welfare['tahun'] ?? null,
                ],
                [
                    'provider' => $welfare['penyelenggara'] ?? null,
                    'description' => $welfare['deskripsi'] ?? null,
                ]
            );
        }
    }
}
