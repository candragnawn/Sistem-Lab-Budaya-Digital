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
        Schema::create('lecturers', function (Blueprint $table) {
            $table->id();
            $table->string('nidn')->unique();
            $table->boolean('is_verified')->default(false);
            $table->string('name');
            $table->string('name_registered_dukcapil')->nullable();
            $table->enum('gender', ['Laki-laki', 'Perempuan']);
            $table->string('email')->unique()->nullable();
            $table->string('title_prefix')->nullable();
            $table->string('title_suffix')->nullable();
            $table->text('bio')->nullable();
            $table->json('education')->nullable(); 
            $table->enum('status', ['Aktif', 'Tugas Belajar', 'Cuti'])->default('Aktif');
            $table->string('photo_path')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lecturers');
    }
};
