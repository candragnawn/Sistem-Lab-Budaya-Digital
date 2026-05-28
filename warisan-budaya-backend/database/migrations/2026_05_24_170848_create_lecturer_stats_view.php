<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration {
    public function up(): void
    {
        DB::statement("CREATE OR REPLACE VIEW v_lecturer_stats AS
            SELECT
                l.id as lecturer_id,
                (SELECT COUNT(*) FROM publication WHERE lecturer_id = l.id AND type = 'Jurnal Ilmiah') as jurnal_count,
                (SELECT COUNT(*) FROM publication WHERE lecturer_id = l.id AND type = 'Buku Referensi') as buku_count,
                (SELECT COUNT(*) FROM lecturer_hki WHERE lecturer_id = l.id) as hki_count,
                (SELECT COUNT(*) FROM publication WHERE lecturer_id = l.id AND category = 'PENGABDIAN') as pengabdian_count,
                (SELECT COUNT(*) FROM publication WHERE lecturer_id = l.id AND source = 'scopus') as scopus_count,
                (SELECT COUNT(*) FROM publication WHERE lecturer_id = l.id AND source = 'scopus' AND quartile = 'Q1') as q1_count,
                (SELECT COUNT(*) FROM publication WHERE lecturer_id = l.id AND source = 'scopus' AND quartile = 'Q2') as q2_count,
                (SELECT COUNT(*) FROM publication WHERE lecturer_id = l.id AND source = 'sinta') as sinta_count,
                (SELECT COUNT(*) FROM publication WHERE lecturer_id = l.id AND source = 'manual') as manual_count,
                (SELECT COUNT(*) FROM research WHERE lecturer_id = l.id) as researchs_count,
                (SELECT COUNT(*) FROM community_service WHERE lecturer_id = l.id) as community_service_count
            FROM lecturer l
        "); 
    }

    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS v_lecturer_stats");
    }
};