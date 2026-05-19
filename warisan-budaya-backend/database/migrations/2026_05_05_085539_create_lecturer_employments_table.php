<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

/**
 * migration untuk tabel employments
 */
return new class extends Migration {
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('employments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lecturers_id')->constrained()->onDelete('cascade');
            $table->string('nip')->unique();
            $table->string('sk_cpns_number')->nullable();
            $table->date('sk_cpns_date')->nullable();
            $table->string('rank_group')->nullable();
            $table->date('sk_date')->nullable();
            $table->integer('work_years')->nullable();
            $table->integer('work_months')->nullable();
            $table->string('employment_status')->nullable();
            $table->string('active_status')->default('Aktif');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('_employments');
    }
};
