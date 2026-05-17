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
        Schema::create('research', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lecturer_id')->constrained('lectures')->onDelete('cascade');
            $table->string('title');                  // Judul
            $table->string('scientific_field');       // Bidang Keilmuan
            $table->string('implementation_year', 9); // Tahun Pelaksanaan (mis: 2024/2025)
            $table->string('duration');               // Lama Kegiatan
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('research');
    }
};
