<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;


return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        
      DB::statement("
      CREATE VIEW v_lecturer_stats AS
        SELECT 
            l.id as lecturer_id,
            (SELECT COUNT(*) FROM publications WHERE lecturer_id = l.id AND type = 'Jurnal Ilmiah') as jurnal_count,
            (SELECT COUNT(*) FROM publications WHERE lecturer_id = l.id AND type = 'Buku Referensi') as buku_count,
            (SELECT COUNT(*) FROM publications WHERE lecturer_id = l.id AND type = 'HKI') as hki_count,
            (SELECT COUNT(*) FROM publications WHERE lecturer_id = l.id AND category = 'PENGABDIAN') as pengabdian_count
            (SELECT COUNT(*) FROM publications WHERE lecturer_id = l.id AND source = 'scopus') as scopus_count,
            (SELECT COUNT(*) FROM publications WHERE lecturer_id = l.id AND source = 'scopus' AND quartile = 'Q1') as q1_count,
            (SELECT COUNT(*) FROM publications WHERE lecturer_id = l.id AND source = 'scopus' AND quartile = 'Q2') as q2_count,
            (SELECT COUNT(*) FROM publications WHERE lecturer_id = l.id AND source = 'scopus' AND (quartile = 'Q3' OR quartile = 'Q4')) as q3_q4_count,

            (SELECT COUNT(*) FROM publications WHERE lecturer_id = l.id AND source = 'sinta') as sinta_count,
            (SELECT COUNT(*) FROM publications WHERE lecturer_id = l.id AND source = 'manual') as manual_unverified_count
    FROM lecturers l
      ");
    }

    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS v_lecturer_stats");
    }
};
