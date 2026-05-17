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
        Schema::create('scholarships', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lecturer_id')->constrained('lectures')->onDelete('cascade');
            $table->string('scholarship_type');          // Jenis Beasiswa
            $table->string('scholarship_name');          // Nama Beasiswa
            $table->year('start_year');                  // Tahun Mulai
            $table->year('end_year')->nullable();        // Tahun Selesai
            $table->boolean('is_active')->default(false); // Masih Terima
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('scholarships');
    }
};
