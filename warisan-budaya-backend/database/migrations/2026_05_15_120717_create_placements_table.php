<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('placements', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lecturer_id')->constrained('lectures')->onDelete('cascade');
            $table->string('status');                         // Status
            $table->string('employment_bond');                // Ikatan Kerja
            $table->string('education_level');                // Jenjang Pendidikan
            $table->string('unit');                           // Unit
            $table->string('university');                     // Perguruan Tinggi
            $table->date('start_date');                       // Terhitung Mulai Tanggal
            $table->date('exit_date')->nullable();            // Tanggal Keluar
            $table->date('end_date')->nullable();             // Terhitung Selesai Tanggal
            $table->string('assignment_homebase')->nullable(); // Homebase Penugasan
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('placements');
    }
};
