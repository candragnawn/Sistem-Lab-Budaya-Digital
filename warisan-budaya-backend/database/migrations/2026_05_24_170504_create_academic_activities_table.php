<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('teaching', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lecturer_id')->constrained('lecturer')->onDelete('cascade');
            $table->string('course_name');
            $table->string('course_type');
            $table->string('scientific_field');
            $table->string('class');
            $table->unsignedSmallInteger('student_count');
            $table->tinyInteger('credits');
            $table->timestamps();
        });

        Schema::create('student_supervision', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lecturer_id')->constrained('lecturer')->onDelete('cascade');
            $table->string('semester');
            $table->string('activity_category');
            $table->string('supervision_type');
            $table->string('scientific_field');
            $table->string('study_program');
            $table->timestamps();
        });

        Schema::create('student_examination', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lecturer_id')->constrained('lecturer')->onDelete('cascade');
            $table->string('examination_title');
            $table->string('scientific_field');
            $table->string('examination_type');
            $table->string('study_program');
            $table->timestamps();
        });

        Schema::create('teaching_material', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lecturer_id')->constrained('lecturer')->onDelete('cascade');
            $table->string('title');
            $table->string('isbn', 20)->nullable();
            $table->date('publication_date');
            $table->string('publisher');
            $table->timestamps();
        });

        Schema::create('student_development', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lecturer_id')->constrained('lecturer')->onDelete('cascade');
            $table->string('semester');
            $table->string('activity_category');
            $table->string('guidance_title');
            $table->string('guidance_type');
            $table->string('study_program');
            $table->timestamps();
        });

        Schema::create('visiting_scientist', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lecturer_id')->constrained('lecturer')->onDelete('cascade');
            $table->string('host_university');
            $table->string('duration');
            $table->date('activity_date');
            $table->timestamps();
        });

        Schema::create('detasering', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lecturer_id')->constrained('lecturer')->onDelete('cascade');
            $table->string('target_university');
            $table->string('activity_category');
            $table->string('assignment_decree_number');
            $table->date('decree_date');
            $table->timestamps();
        });

        Schema::create('academic_oration', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lecturer_id')->constrained('lecturer')->onDelete('cascade');
            $table->string('activity_category');
            $table->string('paper_title');
            $table->string('guest_lecturer_name');
            $table->string('organizer');
            $table->date('activity_date');
            $table->timestamps();
        });

        Schema::create('lecturer_mentor', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lecturer_id')->constrained('lecturer')->onDelete('cascade');
            $table->string('mentor_name');
            $table->date('start_date');
            $table->date('end_date')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lecturer_mentor');
        Schema::dropIfExists('academic_oration');
        Schema::dropIfExists('detasering');
        Schema::dropIfExists('visiting_scientist');
        Schema::dropIfExists('student_development');
        Schema::dropIfExists('teaching_material');
        Schema::dropIfExists('student_examination');
        Schema::dropIfExists('student_supervision');
        Schema::dropIfExists('teaching');
    }
};