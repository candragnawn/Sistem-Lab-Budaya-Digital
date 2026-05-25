<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('identities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lecturers_id')->constrained('lecturers')->onDelete('cascade');
            $table->string('nik')->unique();
            $table->string('religion')->nullable();
            $table->string('citizenship')->nullable();
            $table->string('npwp')->nullable();
            $table->timestamps();
        });

        Schema::create('addresses', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lecturers_id')->constrained('lecturers')->onDelete('cascade');
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

        Schema::create('families', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lecturers_id')->constrained('lecturers')->onDelete('cascade');
            $table->string('marital_status')->nullable();
            $table->string('spouse_name')->nullable();
            $table->string('spouse_nip')->nullable();
            $table->string('spouse_occupation')->nullable();
            $table->timestamps();
        });

        Schema::create('education', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lecturers_id')->constrained('lecturers')->onDelete('cascade');
            $table->string('entry_year');
            $table->string('level');
            $table->string('country');
            $table->string('university');
            $table->string('study_program');
            $table->string('graduation_year');
            $table->string('predicate')->nullable();
            $table->timestamps();
        });

        Schema::create('studies', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lecturers_id')->constrained('lecturers')->onDelete('cascade');
            $table->string('entry_year');
            $table->string('level');
            $table->string('university');
            $table->string('study_program');
            $table->string('scholarship');
            $table->string('status');
            $table->string('Types_of_Learning');
            $table->timestamps();
        });

        Schema::create('certificate', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lecturers_id')->constrained('lecturers')->onDelete('cascade');
            $table->string('certification_type');
            $table->string('study_type');
            $table->string('educator_registration_number')->unique();
            $table->string('certificate_sk_number');
            $table->year('certification_year');
            $table->timestamps();
        });

        Schema::create('employments', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lecturers_id')->constrained('lecturers')->onDelete('cascade');
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

    public function down(): void
    {
        Schema::dropIfExists('employments');
        Schema::dropIfExists('certificate');
        Schema::dropIfExists('studies');
        Schema::dropIfExists('education');
        Schema::dropIfExists('families');
        Schema::dropIfExists('addresses');
        Schema::dropIfExists('identities');
    }
};