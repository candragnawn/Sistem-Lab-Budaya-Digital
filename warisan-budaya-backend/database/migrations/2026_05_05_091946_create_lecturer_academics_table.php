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
            $table->string('science_cluster')->nullable(); // Rumpun Ilmu
            $table->string('science_tree')->nullable(); // Pohon Ilmu
            $table->string('science_branch')->nullable(); // Cabang Ilmu
            $table->string('npwp')->nullable();
            $table->string('sinta_id')->nullable(); // Kunci untuk Integrator!
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
