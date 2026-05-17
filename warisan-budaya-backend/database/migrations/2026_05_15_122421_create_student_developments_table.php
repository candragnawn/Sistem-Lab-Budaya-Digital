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
        Schema::create('student_developments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lecturer_id')->constrained('lectures')->onDelete('cascade');
            $table->string('semester');           // Semester
            $table->string('activity_category');  // Kategori Kegiatan
            $table->string('guidance_title');     // Judul Bimbingan
            $table->string('guidance_type');      // Jenis Bimbingan
            $table->string('study_program');      // Program Studi
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('student_developments');
    }
};
