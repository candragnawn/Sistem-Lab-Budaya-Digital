<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * migration untuk tabel teaching_materials
 */
return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('teaching_materials', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lecturers_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->string('isbn', 20)->nullable();
            $table->date('publication_date');
            $table->string('publisher');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('teaching_materials');
    }
};
