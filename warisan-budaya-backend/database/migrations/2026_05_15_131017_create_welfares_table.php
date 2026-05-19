<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * migration untuk tabel welfares
 */
return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('welfares', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lecturers_id')->constrained()->onDelete('cascade');
            $table->string('welfare_type');
            $table->string('welfare_service');
            $table->string('organizer');
            $table->year('start_year');
            $table->year('selection_year');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('welfares');
    }
};
