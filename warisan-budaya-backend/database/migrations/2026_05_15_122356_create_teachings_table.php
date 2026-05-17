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
        Schema::create('teachings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lecturer_id')->constrained('lectures')->onDelete('cascade');
            $table->string('course_name');                    // Mata Kuliah
            $table->string('course_type');                    // Jenis Mata Kuliah
            $table->string('scientific_field');               // Bidang Keilmuan
            $table->string('class');                          // Kelas
            $table->unsignedSmallInteger('student_count');    // Jumlah Mahasiswa
            $table->tinyInteger('credits');                   // SKS
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teachings');
    }
};
