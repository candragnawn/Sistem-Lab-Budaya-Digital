<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('publications', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lecturers_id')->constrained('lecturers')->onDelete('cascade');
            $table->string('title');
            $table->enum('category', ['PENELITIAN', 'PENGABDIAN']);
            $table->string('type');
            $table->string('source')->nullable();      // scopus, sinta, manual
            $table->string('quartile')->nullable();    // Q1, Q2, Q3, Q4
            $table->string('document_url')->nullable();
            $table->string('journal_name')->nullable();
            $table->string('issn')->nullable();
            $table->string('doi')->nullable();
            $table->boolean('is_verified')->default(false);
            $table->year('year');
            $table->string('url')->nullable();
            $table->timestamps();
        });

        Schema::create('hkis', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lecturers_id')->constrained('lecturers')->onDelete('cascade');
            $table->string('title');
            $table->string('activity_category');
            $table->string('type');
            $table->string('quartile', 5)->nullable();
            $table->date('publish_date');
            $table->timestamps();
        });

        Schema::create('research', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lecturers_id')->constrained('lecturers')->onDelete('cascade');
            $table->string('title');
            $table->string('scientific_field');
            $table->string('implementation_year', 9);
            $table->string('duration');
            $table->timestamps();
        });

        Schema::create('community_services', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lecturers_id')->constrained('lecturers')->onDelete('cascade');
            $table->string('title');
            $table->string('scientific_field');
            $table->string('implementation_year', 9);
            $table->string('duration');
            $table->timestamps();
        });

        Schema::create('speakers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lecturers_id')->constrained('lecturers')->onDelete('cascade');
            $table->string('activity_category');
            $table->string('paper_title');
            $table->string('guest_lecturer_name');
            $table->string('organizer');
            $table->date('activity_date');
            $table->timestamps();
        });

        Schema::create('journal_managers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lecturers_id')->constrained('lecturers')->onDelete('cascade');
            $table->string('journal_name');
            $table->string('decree_number');
            $table->date('effective_date');
            $table->date('end_date')->nullable();
            $table->boolean('is_active')->default(true);
            $table->string('role');
            $table->timestamps();
        });

        Schema::create('professional_memberships', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lecturers_id')->constrained('lecturers')->onDelete('cascade');
            $table->string('organization_name');
            $table->string('role');
            $table->year('membership_start');
            $table->year('membership_end')->nullable();
            $table->string('professional_institution');
            $table->timestamps();
        });

        Schema::create('awards', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lecturers_id')->constrained('lecturers')->onDelete('cascade');
            $table->string('award_name');
            $table->string('award_type');
            $table->string('institution');
            $table->year('year');
            $table->timestamps();
        });

        Schema::create('scholarships', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lecturers_id')->constrained('lecturers')->onDelete('cascade');
            $table->string('scholarship_type');
            $table->string('scholarship_name');
            $table->year('start_year');
            $table->year('end_year')->nullable();
            $table->boolean('is_active')->default(false);
            $table->timestamps();
        });

        Schema::create('other_supporting_activities', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lecturers_id')->constrained('lecturers')->onDelete('cascade');
            $table->string('activity_name');
            $table->string('organizing_institution');
            $table->string('decree_number')->nullable();
            $table->date('start_date');
            $table->date('end_date')->nullable();
            $table->string('role');
            $table->timestamps();
        });

        Schema::create('additional_tasks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lecturers_id')->constrained('lecturers')->onDelete('cascade');
            $table->string('additional_task');
            $table->string('work_unit');
            $table->string('institution');
            $table->date('start_date');
            $table->date('end_date')->nullable();
            $table->timestamps();
        });

        Schema::create('source_syncs', function (Blueprint $table) {
            $table->id();
            $table->string('source');                  // sinta, scopus, sister, scholar
            $table->string('status');                  // success, failed, running
            $table->integer('total_synced')->default(0);
            $table->text('error_message')->nullable();
            $table->timestamp('started_at')->nullable();
            $table->timestamp('finished_at')->nullable();
            $table->timestamps();
        });

        Schema::create('publication_author', function (Blueprint $table){
            $table->id();
            $table->foreignId('lecturers');
            $table->foreignId('publication');
            $table->string('author_position');

        });
    }

    public function down(): void
    {
        Schema::dropIfExists('source_syncs');
        Schema::dropIfExists('additional_tasks');
        Schema::dropIfExists('other_supporting_activities');
        Schema::dropIfExists('scholarships');
        Schema::dropIfExists('awards');
        Schema::dropIfExists('professional_memberships');
        Schema::dropIfExists('journal_managers');
        Schema::dropIfExists('speakers');
        Schema::dropIfExists('community_services');
        Schema::dropIfExists('research');
        Schema::dropIfExists('hkis');
        Schema::dropIfExists('publications');
    }
};