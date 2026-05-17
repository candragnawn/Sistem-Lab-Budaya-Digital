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
        Schema::create('other_supporting_activities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lecturer_id')->constrained('lectures')->onDelete('cascade');
            $table->string('activity_name');                   // Nama Kegiatan
            $table->string('organizing_institution');          // Instansi Penyelenggara
            $table->string('decree_number')->nullable();       // Nomor SK Penugasan
            $table->date('start_date');                        // Terhitung Mulai Tanggal
            $table->date('end_date')->nullable();              // Tanggal Selesai
            $table->string('role');                            // Peran
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('other_supporting_activities');
    }
};
