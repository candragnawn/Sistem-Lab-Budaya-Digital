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
use App\Models\User;
use Illuminate\Support\Facades\Hash;


class LabSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Admin Master Account
        User::create([
            'name' => 'Super Admin',
            'email' => 'admin123@gmail.com',
            'password' => Hash::make('12345678'),
            'role' => 'admin',
        ]);

        $lecturer = Lecturer::create([
            'nidn' => '0830018504',
            'name' => 'I Gusti Agung Gede Arya Kadyanan',
            'title_prefix' => 'Dr.',
            'title_suffix' => 'S.Kom., M.Kom.',
            'bio' => 'Dosen tetap di Jurusan Teknik Informatika yang berfokus pada preservasi budaya digital dan sistem informasi warisan budaya Bali.',
            'status' => 'Aktif',
            'scopus_id' => "57210603998",
        ]);

        User::create([
            'name' => $lecturer->name,
            'email' => 'gungde@gmail.com',
            'password' => Hash::make('12345678'),
            'lecturer_id' => $lecturer->id,
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

    }
}
