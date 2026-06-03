<?php

namespace App\service;

use App\Models\Lecturer;
use App\Models\PelaksanaanPengabdian\CommunityService;
use App\Models\PelaksanaanPengabdian\JournalManager;
use App\Models\PelaksanaanPengabdian\Speaker;
use App\Models\PelaksanaanPengabdian\StructuralPosition;

class PengabdianMapper
{
    public function mapCommunityService(Lecturer $lecturer, array $data): void
    {
        foreach ($data as $service) {
            CommunityService::updateOrCreate(
                [
                    'lecturer_id' => $lecturer->id,
                    'title' => $service['judul_pengabdian'] ?? $service['title'] ?? null,
                    'implementation_year' => $service['tahun_pelaksanaan'] ?? $service['implementation_year'] ?? null,
                ],
                [
                    'scientific_field' => $service['bidang_keilmuan'] ?? $service['scientific_field'] ?? null,
                    'duration' => $service['durasi'] ?? $service['duration'] ?? null,
                ]
            );
        }
    }

    public function mapJournalManager(Lecturer $lecturer, array $data): void
    {
        foreach ($data as $journal) {
            JournalManager::updateOrCreate(
                [
                    'lecturer_id' => $lecturer->id,
                    'journal_name' => $journal['nama_jurnal'] ?? null,
                    'year' => $journal['tahun'] ?? null,
                ],
                [
                    'role' => $journal['peran'] ?? null,
                    'publisher' => $journal['penerbit'] ?? null,
                ]
            );
        }
    }

    public function mapSpeaker(Lecturer $lecturer, array $data): void
    {
        foreach ($data as $speaker) {
            Speaker::updateOrCreate(
                [
                    'lecturer_id' => $lecturer->id,
                    'event_name' => $speaker['nama_acara'] ?? null,
                    'year' => $speaker['tahun'] ?? null,
                ],
                [
                    'level' => $speaker['tingkat'] ?? null,
                    'organizer' => $speaker['penyelenggara'] ?? null,
                ]
            );
        }
    }

    public function mapStructuralPosition(Lecturer $lecturer, array $data): void
    {
        foreach ($data as $position) {
            StructuralPosition::updateOrCreate(
                [
                    'lecturer_id' => $lecturer->id,
                    'position' => $position['nama_jabatan'] ?? null,
                    'start_date' => $position['tanggal_mulai'] ?? null,
                ],
                [
                    'decree_number' => $position['nomor_sk'] ?? null,
                    'end_date' => $position['tanggal_selesai'] ?? null,
                ]
            );
        }
    }
}
