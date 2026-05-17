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
        Schema::create('publication_works', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lecturer_id')->constrained('lectures')->onDelete('cascade');
            $table->string('title');                       // Judul
            $table->string('activity_category');           // Kategori Kegiatan
            $table->string('publication_type');            // Jenis Publikasi
            $table->string('quartile', 5)->nullable();     // Quartile (Q1–Q4)
            $table->date('publication_date');              // Tanggal Terbit
            $table->string('data_source')->nullable();     // Asal Data (mis: Sinta, Scopus)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('publication_works');
    }
};
