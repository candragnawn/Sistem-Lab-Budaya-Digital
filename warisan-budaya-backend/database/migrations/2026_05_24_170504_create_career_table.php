<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('rank', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lecturer_id')->constrained('lecturer')->onDelete('cascade');
            $table->string('group_code');
            $table->string('rank_name');
            $table->string('sk_number');
            $table->date('sk_date');
            $table->date('tmt');
            $table->date('received_date')->nullable();
            $table->timestamps();
        });

        Schema::create('inpassing', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lecturer_id')->constrained('lecturer')->onDelete('cascade');
            $table->string('rank_group');
            $table->string('decree_number');
            $table->date('effective_date');
            $table->timestamps();
        });

        Schema::create('functional_position', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lecturer_id')->constrained('lecturer')->onDelete('cascade');
            $table->string('functional_position');
            $table->string('decree_number');
            $table->date('decree_date');
            $table->date('effective_date');
            $table->string('civil_servant_status');
            $table->timestamps();
        });

        Schema::create('structural_position', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lecturer_id')->constrained('lecturer')->onDelete('cascade');
            $table->string('structural_position');
            $table->string('decree_number');
            $table->date('start_date');
            $table->date('end_date')->nullable();
            $table->timestamps();
        });

        Schema::create('placement', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lecturer_id')->constrained('lecturer')->onDelete('cascade');
            $table->string('status');
            $table->string('employment_bond');
            $table->string('education_level');
            $table->string('unit');
            $table->string('university');
            $table->date('start_date');
            $table->date('exit_date')->nullable();
            $table->date('end_date')->nullable();
            $table->string('assignment_homebase')->nullable();
            $table->timestamps();
        });

        Schema::create('professor_emeritus', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lecturer_id')->constrained('lecturer')->onDelete('cascade');
            $table->string('title_name');
            $table->string('university');
            $table->date('start_date');
            $table->date('end_date')->nullable();
            $table->timestamps();
        });

        Schema::create('diklat', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lecturer_id')->constrained('lecturer')->onDelete('cascade');
            $table->string('training_name');
            $table->string('training_type');
            $table->string('organizer');
            $table->year('year');
            $table->string('status');
            $table->timestamps();
        });

        Schema::create('test', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lecturer_id')->constrained('lecturer')->onDelete('cascade');
            $table->string('test_name');
            $table->decimal('test_score', 5, 2);
            $table->string('organizer');
            $table->year('year');
            $table->timestamps();
        });

        Schema::create('allowance', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lecturer_id')->constrained('lecturer')->onDelete('cascade');
            $table->string('allowance_type');
            $table->string('allowance_name');
            $table->string('granting_institution');
            $table->string('funding_source');
            $table->year('start_year');
            $table->year('end_year')->nullable();
            $table->decimal('amount', 15, 2);
            $table->timestamps();
        });

        Schema::create('welfare', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lecturer_id')->constrained('lecturer')->onDelete('cascade');
            $table->string('welfare_type');
            $table->string('welfare_service');
            $table->string('organizer');
            $table->year('start_year');
            $table->year('selection_year');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('welfare');
        Schema::dropIfExists('allowance');
        Schema::dropIfExists('test');
        Schema::dropIfExists('diklat');
        Schema::dropIfExists('professor_emeritus');
        Schema::dropIfExists('placement');
        Schema::dropIfExists('structural_position');
        Schema::dropIfExists('functional_position');
        Schema::dropIfExists('inpassing');
        Schema::dropIfExists('rank');
    }
};