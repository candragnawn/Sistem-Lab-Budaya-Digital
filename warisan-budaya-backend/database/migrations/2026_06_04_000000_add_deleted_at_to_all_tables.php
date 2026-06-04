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
        // Ambil semua nama tabel di database
        $tables = DB::select('SHOW TABLES');
        $dbName = env('DB_DATABASE', 'db_warisan_budaya');
        $columnName = "Tables_in_{$dbName}";

        // Tabel bawaan Laravel yang tidak perlu ditambahkan deleted_at
        $excludedTables = [
            'migrations', 
            'users', 
            'password_reset_tokens', 
            'failed_jobs', 
            'personal_access_tokens'
        ];

        foreach ($tables as $table) {
            $tableName = $table->$columnName;

            if (!in_array($tableName, $excludedTables)) {
                // Cek apakah tabel sudah punya deleted_at untuk menghindari error duplikat
                if (Schema::hasTable($tableName) && !Schema::hasColumn($tableName, 'deleted_at')) {
                    Schema::table($tableName, function (Blueprint $table) {
                        $table->softDeletes();
                    });
                }
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        $tables = DB::select('SHOW TABLES');
        $dbName = env('DB_DATABASE', 'db_warisan_budaya');
        $columnName = "Tables_in_{$dbName}";

        $excludedTables = [
            'migrations', 
            'users', 
            'password_reset_tokens', 
            'failed_jobs', 
            'personal_access_tokens'
        ];

        foreach ($tables as $table) {
            $tableName = $table->$columnName;

            if (!in_array($tableName, $excludedTables)) {
                if (Schema::hasTable($tableName) && Schema::hasColumn($tableName, 'deleted_at')) {
                    Schema::table($tableName, function (Blueprint $table) {
                        $table->dropSoftDeletes();
                    });
                }
            }
        }
    }
};
