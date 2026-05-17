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
        Schema::create('work_histories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lecturer_id')->constrained('lectures')->onDelete('cascade');
            $table->string('job_name');          // Nama Pekerjaan
            $table->text('job_description');     // Rincian Pekerjaan
            $table->string('duration');          // Waktu
            $table->boolean('is_abroad')->default(false); // LN/DN (true=LN, false=DN)
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('work_histories');
    }
};
