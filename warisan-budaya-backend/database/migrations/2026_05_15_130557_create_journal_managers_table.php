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
        Schema::create('journal_managers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lecturer_id')->constrained('lectures')->onDelete('cascade');
            $table->string('journal_name');           // Nama Jurnal
            $table->string('decree_number');          // No. SK Penugasan
            $table->date('effective_date');           // Terhitung Mulai Tanggal
            $table->date('end_date')->nullable();     // Tanggal Selesai
            $table->boolean('is_active')->default(true); // Status Aktif
            $table->string('role');                   // Peran
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('journal_managers');
    }
};
