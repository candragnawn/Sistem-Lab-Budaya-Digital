<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * migration untuk tabel h_k_i_s
 */
return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('h_k_i_s', function (Blueprint $table) {
            $table->id();
            $table->timestamps();
            $table->foreignId('lecturers_id')->constrained()->onDelete('cascade');
            $table->string("title");
            $table->string("activity_category");
            $table->string("type");
            $table->string('quartile', 5);
            $table->date('publish_date');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('h_k_i_s');
    }
};
