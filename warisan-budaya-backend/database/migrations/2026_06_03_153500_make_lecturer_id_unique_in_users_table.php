<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // 1. Membersihkan data kembar terlebih dahulu
        // Kita set 'lecturer_id' menjadi NULL untuk user-user duplikat (menyisakan 1 user terlama/ID terkecil)
        // Ini memastikan saat kita menaruh kunci 'unique', database tidak akan memunculkan error!
        DB::statement('
            UPDATE users 
            SET lecturer_id = NULL 
            WHERE id NOT IN (
                SELECT min_id FROM (
                    SELECT MIN(id) as min_id 
                    FROM users 
                    WHERE lecturer_id IS NOT NULL 
                    GROUP BY lecturer_id
                ) AS temp
            )
            AND lecturer_id IS NOT NULL
        ');

        // 2. Mengunci lecturer_id agar wajib unik (1 to 1)
        Schema::table('users', function (Blueprint $table) {
            $table->unique('lecturer_id', 'users_lecturer_id_unique');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropUnique('users_lecturer_id_unique');
        });
    }
};
