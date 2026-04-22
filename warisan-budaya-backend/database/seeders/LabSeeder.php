<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Lecturer;
use App\Models\Category;
use App\Models\Publication;
use App\Models\Event;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class LabSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
     $lecturer = Lecturer::create([
            'nip' => '198403172010121001',
            'name' => 'Anak Agung Candra Gunawan, S.Kom., M.Kom.',
            'title_prefix' => 'Dr.',
            'title_suffix' => 'S.Kom., M.Kom.',
            'email' => 'dosen.lab@undiksha.ac.id',
            'bio' => 'Dosen tetap di Jurusan Teknik Informatika yang berfokus pada preservasi budaya digital dan sistem informasi warisan budaya Bali.',
            'education' => json_encode([
                ['year' => '2015', 'degree' => 'S3 - Ilmu Komputer', 'univ' => 'Universitas Indonesia'],
                ['year' => '2008', 'degree' => 'S2 - Teknologi Informasi', 'univ' => 'ITB'],
            ]),
            'status' => 'Aktif',
        ]);

        $lecturer->workContracts()->createMany([ [
             'work_status' => 'PNS',
             'current_status' => 'Aktif',
             'tmt' => '18 Agustus 2023'
        ]
           
        ]);
        

        $lecturer->education()->createMany([ 
            [
             'entry_year' => '1 Januari 2024',
             'level' => 'Profesi',
             'country'=> 'Indonesia',
             'university' => 'Universitas Udayana',
             'study_program' => 'Teknik Informatika',
             'graduation_year' => '2024',
             'predicate' => 'cum laude'
        ],
            [
             'entry_year' => '2 Januari 2024',
             'level' => 'Profesi',
             'country'=> 'Indonesia',
             'university' => 'Universitas Udayana',
             'study_program' => 'Teknik Informatika',
             'graduation_year' => '2024',
             'predicate' => 'cum laude'
        ]
           
        ]);

        $lecturer->positions()->createMany([
        [
            'type' => 'Fungsional',
            'position_name' => 'Lektor Kepala',
            'sk_number' => 'SK-FUN-001',
            'sk_date' => '2022-05-10',
            'tmt' => '2022-06-01',
        ],
        [
            'type' => 'Struktural',
            'position_name' => 'Ketua Gugus Kendali Mutu',
            'unit' => 'Jurusan Teknik Informatika',
            'sk_number' => 'SK-STR-099',
            'sk_date' => '2023-01-15',
            'tmt' => '2023-02-01',
            'valid_until' => '2027-02-01',
        ],
    ]);

    $lecturer->teachings()->createMany([
        [
            'academic_year' => '2023 GANJIL',
            'course_code' => 'IK123',
            'course_name' => 'Pemrograman Web Next.js',
            'credits' => '3.00',
            'class_name' => 'Kelas A',
        ],
        [
            'academic_year' => '2023 GANJIL',
            'course_code' => 'IK456',
            'course_name' => 'Basis Data Lanjut',
            'credits' => '3.00',
            'class_name' => 'Kelas B',
        ],
    ]);
        
        $categories = ['Lontar', 'Seni Arsitektur', 'Tarian Tradisional', 'Upacara Adat'];
        foreach ($categories as $cat) {
          Category::create([
        'name' => $cat,
        'slug' => Str::slug($cat), 
        'description' => "Koleksi digital terkait $cat warisan budaya Bali.",
        'icon' => 'folder' 
    ]);

        }

        $penelitianTypes = ['Jurnal Ilmiah', 'Buku Referensi', 'HKI', 'Prosiding'];
        foreach ($penelitianTypes as $type) {
            $count = ($type == 'Jurnal Ilmiah') ? 144 : rand(5, 15); 
            for ($i = 1; $i <= $count; $i++) {
                Publication::create([
                    'lecturer_id' => $lecturer->id,
                    'category' => 'PENELITIAN',
                    'type' => $type,
                    'title' => "Penelitian Warisan Budaya $type Ke-$i",
                    'year' => rand(2020, 2024),
                    'url' => 'https://scholar.google.com'
                ]);
            }
        }
        $pengabdianTypes = ['Pelatihan', 'Pendampingan Masyarakat', 'Penyuluhan'];
        foreach ($pengabdianTypes as $type) {
            for ($i = 1; $i <= rand(3, 8); $i++) {
                Publication::create([
                    'lecturer_id' => $lecturer->id,
                    'category' => 'PENGABDIAN',
                    'type' => $type,
                    'title' => "Pengabdian Masyarakat $type Ke-$i",
                    'year' => rand(2021, 2024),
                ]);
            }
        }
        Event::create([
            'title' => 'Workshop Digitalisasi Lontar Bali 2024',
            'type' => 'Workshop',
            'event_date' => '2024-05-20',
            'location' => 'Lab Budaya Digital Undiksha',
            'description' => 'Pelatihan teknis menggunakan scanner 3D untuk naskah kuno.',
        ]);
    }
}
