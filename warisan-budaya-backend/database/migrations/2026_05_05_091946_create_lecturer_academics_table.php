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
        Schema::create('lecturer_academics', function (Blueprint $table) {
            $table->foreignId('lecturer_id')->constrained()->onDelete('cascade');
            $table->string('science_cluster')->nullable(); 
            $table->string('science_tree')->nullable(); 
            $table->string('science_branch')->nullable(); 
            $table->string('npwp')->nullable();
            $table->string('sinta_id')->nullable(); 
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lecturer_academics');
    }
};
