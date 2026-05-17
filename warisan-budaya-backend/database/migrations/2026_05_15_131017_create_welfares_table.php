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
        Schema::create('welfares', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lecturer_id')->constrained('lectures')->onDelete('cascade');
            $table->string('welfare_type');     // Jenis Kesejahteraan
            $table->string('welfare_service');  // Layanan Kesejahteraan
            $table->string('organizer');        // Penyelenggara
            $table->year('start_year');         // Tahun Mulai
            $table->year('selection_year');     // Tahun Seleksi
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('welfares');
    }
};
