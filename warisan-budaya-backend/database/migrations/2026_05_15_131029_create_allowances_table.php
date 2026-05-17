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
        Schema::create('allowances', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lecturer_id')->constrained('lectures')->onDelete('cascade');
            $table->string('allowance_type');          // Jenis Tunjangan
            $table->string('allowance_name');          // Nama Tunjangan
            $table->string('granting_institution');    // Instansi Pemberi Tunjangan
            $table->string('funding_source');          // Sumber Dana
            $table->year('start_year');                // Tahun Mulai
            $table->year('end_year')->nullable();      // Tahun Selesai
            $table->decimal('amount', 15, 2);         // Nominal
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('allowances');
    }
};
