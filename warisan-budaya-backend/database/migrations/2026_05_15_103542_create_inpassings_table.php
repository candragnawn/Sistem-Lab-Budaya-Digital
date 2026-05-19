<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * migration untuk tabel inpassings
 */
return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('inpassings', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lecturers_id')->constrained()->onDelete('cascade');
            $table->string('rank_group');
            $table->string('decree_number');
            $table->date('effective_date');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('inpassings');
    }
};
