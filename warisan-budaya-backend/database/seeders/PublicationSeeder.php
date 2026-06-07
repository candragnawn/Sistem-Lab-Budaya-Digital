<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\PelaksanaanPenelitian\Publication;
use App\Models\PelaksanaanPenelitian\Research;
use App\Models\PelaksanaanPengabdian\CommunityService;

class PublicationSeeder extends Seeder
{
    public function run(): void
    {
        $lecturerId = 1; // Dosen "Budi" yang sudah ada

        // Publikasi Jurnal (dengan quartile & is_verified bervariasi)
        $journals = [
            ['title' => 'Digitalisasi Lontar Bali Menggunakan Deep Learning', 'journal_name' => 'Journal of Cultural Heritage', 'quartile' => 'Q1', 'year' => 2024, 'is_verified' => true],
            ['title' => 'Sistem Preservasi Warisan Budaya Digital Berbasis AI', 'journal_name' => 'Journal of Information Systems', 'quartile' => 'Q2', 'year' => 2023, 'is_verified' => true],
            ['title' => 'Image Recognition pada Motif Kain Tradisional Bali', 'journal_name' => 'IEEE Access', 'quartile' => 'Q1', 'year' => 2023, 'is_verified' => true],
            ['title' => 'Augmented Reality untuk Museum Warisan Budaya', 'journal_name' => 'Computers & Education', 'quartile' => 'Q2', 'year' => 2022, 'is_verified' => true],
            ['title' => 'NLP untuk Transliterasi Teks Aksara Bali', 'journal_name' => 'Expert Systems with Applications', 'quartile' => 'Q1', 'year' => 2022, 'is_verified' => false],
            ['title' => 'Sistem Rekomendasi Konten Budaya Berbasis Collaborative Filtering', 'journal_name' => 'Journal of Intelligent Systems', 'quartile' => 'Q3', 'year' => 2021, 'is_verified' => true],
            ['title' => 'Metadata Schema untuk Arsip Digital Budaya Nusantara', 'journal_name' => 'Library Hi Tech', 'quartile' => 'Q2', 'year' => 2021, 'is_verified' => true],
            ['title' => 'Ontologi Warisan Budaya Tak Benda Indonesia', 'journal_name' => 'Knowledge-Based Systems', 'quartile' => 'Q1', 'year' => 2020, 'is_verified' => true],
            ['title' => 'Crowdsourcing Data Budaya dari Platform Media Sosial', 'journal_name' => 'Telematics and Informatics', 'quartile' => 'Q2', 'year' => 2020, 'is_verified' => false],
        ];

        foreach ($journals as $pub) {
            Publication::create([
                'lecturer_id' => $lecturerId,
                'category'    => 'PENELITIAN',
                'type'        => 'JURNAL',
                'title'       => $pub['title'],
                'journal_name'=> $pub['journal_name'],
                'quartile'    => $pub['quartile'],
                'year'        => $pub['year'],
                'is_verified' => $pub['is_verified'],
                'source'      => 'scopus',
            ]);
        }

        // Prosiding
        $prosiding = [
            ['title' => 'Smart Tagging System untuk Koleksi Museum Digital', 'year' => 2024],
            ['title' => 'Evaluasi Platform E-Heritage Berbasis User Experience', 'year' => 2023],
            ['title' => 'Transfer Learning untuk Klasifikasi Batik Nusantara', 'year' => 2022],
        ];

        foreach ($prosiding as $pub) {
            Publication::create([
                'lecturer_id' => $lecturerId,
                'category'    => 'PENELITIAN',
                'type'        => 'PROSIDING',
                'title'       => $pub['title'],
                'year'        => $pub['year'],
                'is_verified' => true,
                'source'      => 'sinta',
            ]);
        }

        // Penelitian (tabel researchs)
        Research::create(['lecturer_id' => $lecturerId, 'title' => 'Pengembangan Sistem Repositori Digital Lontar', 'scientific_field' => 'Ilmu Komputer', 'implementation_year' => '2024', 'duration' => '12 bulan']);
        Research::create(['lecturer_id' => $lecturerId, 'title' => 'AI Berbasis Pengenalan Aksara Bali Kuno', 'scientific_field' => 'Kecerdasan Buatan', 'implementation_year' => '2023', 'duration' => '10 bulan']);
        Research::create(['lecturer_id' => $lecturerId, 'title' => 'Rekonstruksi Virtual 3D Candi Hindu Bali', 'scientific_field' => 'Sistem Informasi', 'implementation_year' => '2022', 'duration' => '8 bulan']);
        Research::create(['lecturer_id' => $lecturerId, 'title' => 'Platform Kolaborasi Digitalisasi Naskah Nusantara', 'scientific_field' => 'Rekayasa Perangkat Lunak', 'implementation_year' => '2021', 'duration' => '12 bulan']);
        Research::create(['lecturer_id' => $lecturerId, 'title' => 'Semantic Web untuk Integrasi Data Budaya', 'scientific_field' => 'Basis Data', 'implementation_year' => '2020', 'duration' => '9 bulan']);

        // Pengabdian Masyarakat (tabel community_services)
        CommunityService::create(['lecturer_id' => $lecturerId, 'title' => 'Pelatihan Digitalisasi Naskah Lontar bagi Komunitas Puri Bali', 'scientific_field' => 'Ilmu Komputer', 'implementation_year' => '2024', 'duration' => 3]);
        CommunityService::create(['lecturer_id' => $lecturerId, 'title' => 'Workshop Pembuatan Konten Digital Budaya untuk Siswa SMA', 'scientific_field' => 'Teknologi Informasi', 'implementation_year' => '2023', 'duration' => 2]);
        CommunityService::create(['lecturer_id' => $lecturerId, 'title' => 'Pendampingan Museum Daerah dalam Digitalisasi Koleksi', 'scientific_field' => 'Sistem Informasi', 'implementation_year' => '2022', 'duration' => 4]);
        CommunityService::create(['lecturer_id' => $lecturerId, 'title' => 'Sosialisasi Platform E-Heritage untuk Dinas Kebudayaan', 'scientific_field' => 'Informatika', 'implementation_year' => '2021', 'duration' => 1]);
    }
}
