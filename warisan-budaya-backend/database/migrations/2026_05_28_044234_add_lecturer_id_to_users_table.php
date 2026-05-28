<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::table('users', function (Blueprint $table) {
        $table->foreignId('lecturers_id')->nullable()->constrained('lecturers')->onDelete('set null');
    });
}

    public function down()
{
    Schema::table('users', function (Blueprint $table) {
        $table->dropForeign(['lecturers_id']);
        $table->dropColumn('lecturers_id');
    });
}
};
