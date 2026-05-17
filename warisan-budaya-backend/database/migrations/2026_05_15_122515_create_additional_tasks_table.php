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
        Schema::create('additional_tasks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lecturer_id')->constrained('lectures')->onDelete('cascade');
            $table->string('additional_task');       // Tugas Tambahan
            $table->string('work_unit');             // Unit Kerja
            $table->string('institution');           // Instansi
            $table->date('start_date');              // Tanggal Mulai
            $table->date('end_date')->nullable();    // Tanggal Berakhir
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('additional_tasks');
    }
};
