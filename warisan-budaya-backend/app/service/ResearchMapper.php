<?php

namespace App\service;

use App\Models\Lecturer;
use App\Models\PelaksanaanPenelitian\Publication;
use App\Models\PelaksanaanPenelitian\PublicationAuthor;
use App\Models\PelaksanaanPenelitian\Research;
use App\Models\PelaksanaanPenelitian\HKI;
use App\Models\Profile\LecturerStat;
use Illuminate\Support\Str;

class ResearchMapper
{
    public function mapPublications(Lecturer $lecturer, array $data): void
    {
        foreach ($data as $pub) {
            $publication = Publication::updateOrCreate(
                [
                    'title' => $pub['title'] ?? null,
                    'year' => $pub['year'] ?? null,
                ],
                [
                    'lecturer_id' => $lecturer->id,
                    'doi' => $pub['doi'] ?? null,
                    'journal_name' => $pub['journal_name'] ?? null,
                    'issn' => $pub['issn'] ?? null,
                    'quartile' => $pub['quartile'] ?? null,
                    'category' => $pub['category'] ?? null,
                    'type' => $pub['type'] ?? null,
                    'source' => $pub['source'] ?? null,
                    'url' => $pub['url'] ?? null,
                    'is_verified' => true,
                ]
            );

            PublicationAuthor::firstOrCreate(
                [
                    'lecturer_id' => $lecturer->id,
                    'publication_id' => $publication->id,
                ],
                [
                    'author_position' => 'Belum Ditentukan'
                ]
            );
        }
    }

    public function mapResearch(Lecturer $lecturer, array $data): void
    {
        foreach ($data as $res) {
            Research::updateOrCreate(
                [
                    'lecturer_id' => $lecturer->id,
                    'title' => $res['title'] ?? null,
                    'implementation_year' => $res['implementation_year'] ?? null,
                ],
                [
                    'scientific_field' => $res['scientific_field'] ?? null,
                    'duration' => $res['duration'] ?? null,
                ]
            );
        }
    }

    public function mapHki(Lecturer $lecturer, array $data): void
    {
        foreach ($data as $hki) {
            HKI::updateOrCreate(
                [
                    'lecturer_id' => $lecturer->id,
                    'title' => $hki['title'] ?? $hki['judul_hki'] ?? null,
                    'year' => $hki['year'] ?? $hki['tahun'] ?? null,
                ],
                [
                    'type' => $hki['type'] ?? $hki['jenis_hki'] ?? null,
                    'registration_number' => $hki['registration_number'] ?? $hki['nomor_pendaftaran'] ?? null,
                ]
            );
        }
    }

    public function mapLecturerStats(Lecturer $lecturer, array $data): void
    {
        if (empty($data)) return;
        
        if (isset($data['sinta_score_v3_overall']) || isset($data['sinta_score_v3_3year'])) {
            $lecturer->update([
                'sinta_score_total' => $data['sinta_score_v3_overall'] ?? $lecturer->sinta_score_total,
                'sinta_score_3yr' => $data['sinta_score_v3_3year'] ?? $lecturer->sinta_score_3yr,
            ]);
        }
    }
}
