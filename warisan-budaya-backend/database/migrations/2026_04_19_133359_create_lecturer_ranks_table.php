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
        Schema::create('lecturer_ranks', function (Blueprint $table) {
        $table->id();
        $table->foreignId('lecturer_id')->constrained()->onDelete('cascade');
        $table->string('group_code'); 
        $table->string('rank_name'); 
        $table->string('sk_number');
        $table->date('sk_date');
        $table->date('tmt');         
        $table->date('received_date')->nullable();
        $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lecturer_ranks');
    }
};
