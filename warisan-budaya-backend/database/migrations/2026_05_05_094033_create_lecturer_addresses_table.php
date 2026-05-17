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
        Schema::create('addresses', function (Blueprint $table) {
            $table->foreignId('lecturer_id')->constrained('lectures')->onDelete('cascade');
            $table->string('email')->nullable();
            $table->text('address')->nullable();
            $table->string('rt', 5)->nullable();
            $table->string('rw', 5)->nullable();
            $table->string('village')->nullable();
            $table->string('district')->nullable();
            $table->string('province')->nullable();
            $table->string('postal_code', 10)->nullable();
            $table->string('phone_number')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('addresses');
    }
};
