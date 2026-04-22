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
        Schema::create('lecturer_positions', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lecturer_id')->constrained()->onDelete('cascade');
            $table->enum('type', ['Fungsional', 'Struktural']); 
            $table->string('position_name'); 
            $table->string('unit')->nullable(); 
            $table->string('sk_number');
            $table->date('sk_date');
            $table->date('tmt');
            $table->string('valid_until')->nullable(); 
            $table->timestamps();

        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lecturer_positions');
    }
};
