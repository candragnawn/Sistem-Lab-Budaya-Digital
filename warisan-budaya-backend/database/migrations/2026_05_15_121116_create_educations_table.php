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
        Schema::create('educations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lecturer_id')->constrained('lectures')->onDelete('cascade');
            $table->string('education_level');  // Jenjang (S1, S2, S3, Sp-1, dll)
            $table->string('degree');            // Gelar
            $table->string('field_of_study');   // Bidang Studi
            $table->string('university');        // Perguruan Tinggi
            $table->year('graduation_year');     // Tahun Lulus
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('educations');
    }
};
