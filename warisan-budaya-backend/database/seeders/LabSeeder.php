<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Lecturer;
use App\Models\Category;
use App\Models\PelaksanaanPenelitian\Publication;
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
            'status' => 'Aktif',
        ]);

        $lecturer->workContracts()->createMany([ [
             'work_status' => 'PNS',
             'current_status' => 'Aktif',
             'tmt' => '2023-08-18'
        ]
           
        ]);
        

        $lecturer->educations()->createMany([ 
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
            'functional_position' => 'Lektor Kepala',
            'decree_number' => 'SK-FUN-001',
            'decree_date' => '2022-05-10',
            'effective_date' => '2022-06-01',
            'civil_servant_status' => 'PNS',
        ]
    ]);

    $lecturer->teachings()->createMany([
        [
            'academic_year' => '2023/2024',
            'semester' => 'GANJIL',
            'course_name' => 'Pemrograman Web Next.js',
            'credits' => 3,
            'class' => 'Kelas A',
            'course_type' => 'Wajib',
            'scientific_field' => 'Ilmu Komputer',
            'student_count' => 40,
        ],
        [
            'academic_year' => '2023/2024',
            'semester' => 'GANJIL',
            'course_name' => 'Basis Data Lanjut',
            'credits' => 3,
            'class' => 'Kelas B',
            'course_type' => 'Wajib',
            'scientific_field' => 'Ilmu Komputer',
            'student_count' => 35,
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

        $penelitianTypes = ['JURNAL', 'BUKU', 'HKI', 'PROSIDING'];
        foreach ($penelitianTypes as $type) {
            $count = ($type == 'JURNAL') ? 14 : rand(5, 15);
            for ($i = 1; $i <= $count; $i++) {
                Publication::create([
                    'lecturer_id' => $lecturer->id,
                    'category' => 'PENELITIAN',
                    'type' => $type,
                    'title' => "Penelitian Warisan Budaya $type Ke-$i",
                    'year' => rand(2020, 2024),
                    'source' => 'scopus', 
                    'quartile' => 'Q1',   
                    'url' => 'https://scholar.google.com'
                ]);
            }
        }
        $pengabdianTypes = ['ARTIKEL', 'JURNAL', 'PROSIDING'];
        foreach ($pengabdianTypes as $type) {
            for ($i = 1; $i <= rand(3, 8); $i++) {
                Publication::create([
                    'lecturer_id' => $lecturer->id,
                    'category' => 'PENGABDIAN',
                    'type' => $type,
                    'title' => "Pengabdian Masyarakat $type Ke-$i",
                    'year' => rand(2021, 2024),
                    'source' => 'sinta', 
                    'quartile' => 'Q1',  
                ]);
            }
        }
    }
}
