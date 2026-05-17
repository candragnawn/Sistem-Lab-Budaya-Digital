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
        Schema::create('certifications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lecturer_id')->constrained('lectures')->onDelete('cascade');
            $table->string('certification_type');              // Jenis Sertifikasi
            $table->string('field_of_study');                  // Bidang Studi
            $table->string('educator_registration_name');      // Nama Registrasi Pendidik
            $table->string('decree_number');                   // Nomor SK Sertifikasi
            $table->year('certification_year');                // Tahun Sertifikasi
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('certifications');
    }
};
