<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::create('lecturers', function (Blueprint $table) {
            $table->id();
            $table->string('nidn', 20)->unique()->nullable();
            $table->string('nip', 30)->unique()->nullable();
            $table->string('name');
            $table->string('name_registered_dukcapil')->nullable();
            $table->string('email')->unique()->nullable();
            $table->string('phone')->nullable();
            $table->string('title_prefix')->nullable();
            $table->string('title_suffix')->nullable();
            $table->text('bio')->nullable();
            $table->enum('gender', ['Laki-laki', 'Perempuan'])->nullable();
            $table->date('birth_date')->nullable();
            $table->string('birth_place')->nullable();
            $table->enum('status', ['Aktif', 'Tugas Belajar', 'Cuti'])->default('Aktif');
            $table->string('photo_path')->nullable();
            $table->boolean('is_verified')->default(false);

            // Institusi
            $table->string('faculty')->nullable();
            $table->string('department')->nullable();
            $table->string('study_program')->nullable();

            // ID Eksternal
            $table->string('sinta_id')->nullable();
            $table->string('scopus_id')->nullable();
            $table->string('sister_id')->nullable();
            $table->string('google_scholar_id')->nullable();
            $table->string('orcid_id')->nullable();

            // Skor
            $table->integer('sinta_score_3yr')->default(0);
            $table->integer('sinta_score_total')->default(0);

            // Sync
            $table->timestamp('last_synced_at')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('categories', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('slug')->unique()->nullable();
            $table->text('description')->nullable();
            $table->string('icon')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('academics', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lecturer_id')->constrained('lecturers')->onDelete('cascade');
            $table->string('science_cluster')->nullable();
            $table->string('science_tree')->nullable();
            $table->string('science_branch')->nullable();
            $table->string('sinta_id')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('lecturer_work_contracts', function (Blueprint $table) {
            $table->id();
            $table->foreignId('lecturer_id')->constrained('lecturers')->onDelete('cascade');
            $table->string('work_status')->nullable();
            $table->string('current_status')->nullable();
            $table->date('tmt')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('lecturer_work_contracts');
        Schema::dropIfExists('academics');
        Schema::dropIfExists('categories');
        Schema::dropIfExists('lecturers');
    }
};