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
        Schema::create('teaching_materials', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lecturer_id')->constrained('lectures')->onDelete('cascade');
            $table->string('title');                    // Judul Bahan Ajar
            $table->string('isbn', 20)->nullable();     // ISBN
            $table->date('publication_date');           // Tanggal Terbit
            $table->string('publisher');                // Penerbit
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
