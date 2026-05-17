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
        Schema::create('structural_positions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lecturer_id')->constrained('lectures')->onDelete('cascade');
            $table->string('structural_position');   // Jabatan Struktural
            $table->string('decree_number');          // Nomor SK
            $table->date('start_date');               // Terhitung Tanggal Mulai
            $table->date('end_date')->nullable();     // Terhitung Tanggal Selesai
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('structural_positions');
    }
};
