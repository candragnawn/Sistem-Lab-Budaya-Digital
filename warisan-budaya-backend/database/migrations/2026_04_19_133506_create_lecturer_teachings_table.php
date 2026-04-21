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
        Schema::create('lecturer_teachings', function (Blueprint $table) {
        $table->id();
        $table->foreignId('lecturer_id')->constrained()->onDelete('cascade');
        $table->string('academic_year'); 
        $table->string('course_code');   
        $table->string('course_name');   
        $table->decimal('credits', 3, 2); 
        $table->string('class_name');    
        $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lecturer_teachings');
    }
};
