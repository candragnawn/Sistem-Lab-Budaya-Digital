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
        Schema::create('academic_orations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lecturer_id')->constrained('lectures')->onDelete('cascade');
            $table->string('activity_category');     // Kategori Kegiatan
            $table->string('paper_title');           // Judul Makalah
            $table->string('guest_lecturer_name');   // Nama Tamu Ilmiah
            $table->string('organizer');             // Penyelenggara
            $table->date('activity_date');           // Tanggal Pelaksanaan
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('academic_orations');
    }
};
