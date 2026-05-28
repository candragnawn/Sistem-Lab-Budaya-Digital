<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    public function up(): void
    {
        DB::statement("CREATE OR REPLACE VIEW v_lecturer_stats AS
            SELECT
                l.id as lecturers_id,
                (SELECT COUNT(*) FROM publications WHERE lecturers_id = l.id AND type = 'Jurnal Ilmiah') as jurnal_count,
                (SELECT COUNT(*) FROM publications WHERE lecturers_id = l.id AND type = 'Buku Referensi') as buku_count,
                (SELECT COUNT(*) FROM lecturer_hkis WHERE lecturers_id = l.id) as hki_count,
                (SELECT COUNT(*) FROM publications WHERE lecturers_id = l.id AND category = 'PENGABDIAN') as pengabdian_count,
                (SELECT COUNT(*) FROM publications WHERE lecturers_id = l.id AND source = 'scopus') as scopus_count,
                (SELECT COUNT(*) FROM publications WHERE lecturers_id = l.id AND source = 'scopus' AND quartile = 'Q1') as q1_count,
                (SELECT COUNT(*) FROM publications WHERE lecturers_id = l.id AND source = 'scopus' AND quartile = 'Q2') as q2_count,
                (SELECT COUNT(*) FROM publications WHERE lecturers_id = l.id AND source = 'sinta') as sinta_count,
                (SELECT COUNT(*) FROM publications WHERE lecturers_id = l.id AND source = 'manual') as manual_count,
                (SELECT COUNT(*) FROM researchs WHERE lecturers_id = l.id) as researchs_count,
                (SELECT COUNT(*) FROM community_services WHERE lecturers_id = l.id) as community_service_count
            FROM lecturers l
        "); 
    }

    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS v_lecturer_stats");
    }
};