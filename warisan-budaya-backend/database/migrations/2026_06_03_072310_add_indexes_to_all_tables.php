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
        try {
            Schema::table('lecturers', function (Blueprint $table) {
                $table->index('email');
                $table->index('nidn');
                $table->index('nip');
                $table->index('sinta_id');
                $table->index('status');
            });
        } catch (\Exception $e) {}

        $tablesWithLecturerId = [
            'publications', 'research', 'community_services', 'awards', 
            'teachings', 'academic_orations', 'additional_tasks', 
            'detaserings', 'journal_managers', 'lecturer_mentorings',
            'speakers', 'structural_positions', 'student_developments',
            'student_examinations', 'student_supervisions', 'teaching_materials',
            'visiting_scientists', 'hki', 'publication_authors'
        ];

        foreach ($tablesWithLecturerId as $tableName) {
            if (Schema::hasTable($tableName)) {
                try {
                    Schema::table($tableName, function (Blueprint $table) {
                        $table->index('lecturer_id');
                    });
                } catch (\Exception $e) {}
            }
        }

        if (Schema::hasTable('publications')) {
            try {
                Schema::table('publications', function (Blueprint $table) {
                    $table->index('year');
                });
            } catch (\Exception $e) {}
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('lecturers', function (Blueprint $table) {
            $table->dropIndex(['email']);
            $table->dropIndex(['nidn']);
            $table->dropIndex(['nip']);
            $table->dropIndex(['sinta_id']);
            $table->dropIndex(['status']);
        });

        $tablesWithLecturerId = [
            'publications', 'research', 'community_services', 'awards', 
            'teachings', 'academic_orations', 'additional_tasks', 
            'detaserings', 'journal_managers', 'lecturer_mentorings',
            'speakers', 'structural_positions', 'student_developments',
            'student_examinations', 'student_supervisions', 'teaching_materials',
            'visiting_scientists', 'hki', 'publication_authors'
        ];

        foreach ($tablesWithLecturerId as $tableName) {
            if (Schema::hasTable($tableName)) {
                Schema::table($tableName, function (Blueprint $table) {
                    $table->dropIndex(['lecturer_id']);
                });
            }
        }

        if (Schema::hasTable('publications')) {
            Schema::table('publications', function (Blueprint $table) {
                $table->dropIndex(['year']);
            });
        }
    }
};
