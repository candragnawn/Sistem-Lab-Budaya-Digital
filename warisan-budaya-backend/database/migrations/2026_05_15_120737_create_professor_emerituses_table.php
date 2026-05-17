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
        Schema::create('professor_emerituses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lecturer_id')->constrained('lectures')->onDelete('cascade');
            $table->string('title_name');          // Nama Gelar
            $table->string('university');           // Perguruan Tinggi
            $table->date('start_date');             // TMT - Terhitung Mulai Tanggal
            $table->date('end_date')->nullable();   // TST - Terhitung Selesai Tanggal
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('professor_emerituses');
    }
};
