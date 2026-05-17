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
        Schema::create('student_supervisions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lecturer_id')->constrained('lectures')->onDelete('cascade');
            $table->string('semester');           // Semester
            $table->string('activity_category');  // Kategori Kegiatan
            $table->string('supervision_type');   // Jenis Bimbingan
            $table->string('scientific_field');   // Bidang Keilmuan
            $table->string('study_program');      // Program Studi
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_supervisions');
    }
};
