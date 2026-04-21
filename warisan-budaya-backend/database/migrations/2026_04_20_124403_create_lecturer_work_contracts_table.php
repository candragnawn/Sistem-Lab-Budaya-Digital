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
        Schema::create('lecturer_work_contracts', function (Blueprint $table) {
            $table->foreignId('lecturer_id')->constrained()->onDelete('cascade');
            $table->string('work_status'); 
            $table->string('current_status'); 
            $table->date('tmt');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('lecturer_work_contracts');
    }
};
