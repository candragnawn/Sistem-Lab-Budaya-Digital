<?php

namespace App\service;

use App\Models\Lecturer;
use App\Models\PelaksanaanPendidikan\Teaching;
use App\Models\PelaksanaanPendidikan\TeachingMaterial;
use App\Models\PelaksanaanPendidikan\StudentSupervision;
use App\Models\PelaksanaanPendidikan\StudentExamination;
use App\Models\PelaksanaanPendidikan\StudentDevelopment;
use App\Models\PelaksanaanPendidikan\VisitingScientist;
use App\Models\PelaksanaanPendidikan\Detasering;
use App\Models\PelaksanaanPendidikan\AcademicOration;
use App\Models\PelaksanaanPendidikan\LecturerMentoring;
use App\Models\PelaksanaanPendidikan\AdditionalTask;

class PendidikanMapper
{
    public function mapTeaching(Lecturer $lecturer, array $data): void
    {
        foreach ($data as $teach) {
            Teaching::updateOrCreate(
                [
                    'lecturer_id' => $lecturer->id,
                    'course_name' => $teach['nama_mata_kuliah'] ?? null,
                    'class' => $teach['kelas'] ?? null,
                    'academic_year' => $teach['tahun_ajaran'] ?? null, // if table doesn't have academic_year, maybe it has credits
                ],
                [
                    'course_type' => $teach['jenis_mata_kuliah'] ?? null,
                    'scientific_field' => $teach['bidang_keilmuan'] ?? null,
                    'student_count' => $teach['jumlah_mahasiswa'] ?? null,
                    'credits' => $teach['sks'] ?? null,
                ]
            );
        }
    }

    public function mapTeachingMaterial(Lecturer $lecturer, array $data): void
    {
        foreach ($data as $material) {
            TeachingMaterial::updateOrCreate(
                [
                    'lecturer_id' => $lecturer->id,
                    'title' => $material['judul_bahan_ajar'] ?? null,
                    'year' => $material['tahun'] ?? null,
                ],
                [
                    'type' => $material['jenis_bahan_ajar'] ?? null,
                    'publisher' => $material['penerbit'] ?? null,
                    'isbn' => $material['isbn'] ?? null,
                ]
            );
        }
    }

    public function mapStudentSupervision(Lecturer $lecturer, array $data): void
    {
        foreach ($data as $supervision) {
            StudentSupervision::updateOrCreate(
                [
                    'lecturer_id' => $lecturer->id,
                    'student_name' => $supervision['nama_mahasiswa'] ?? null,
                    'thesis_title' => $supervision['judul_tugas_akhir'] ?? null,
                ],
                [
                    'role' => $supervision['peran'] ?? null,
                    'program' => $supervision['program_studi'] ?? null,
                    'year' => $supervision['tahun'] ?? null,
                ]
            );
        }
    }

    public function mapStudentExamination(Lecturer $lecturer, array $data): void
    {
        foreach ($data as $exam) {
            StudentExamination::updateOrCreate(
                [
                    'lecturer_id' => $lecturer->id,
                    'student_name' => $exam['nama_mahasiswa'] ?? null,
                    'year' => $exam['tahun'] ?? null,
                ],
                [
                    'exam_type' => $exam['jenis_ujian'] ?? null,
                    'role' => $exam['peran'] ?? null,
                ]
            );
        }
    }

    public function mapStudentDevelopment(Lecturer $lecturer, array $data): void
    {
        foreach ($data as $dev) {
            StudentDevelopment::updateOrCreate(
                [
                    'lecturer_id' => $lecturer->id,
                    'activity_name' => $dev['nama_kegiatan'] ?? null,
                    'year' => $dev['tahun'] ?? null,
                ],
                [
                    'role' => $dev['peran'] ?? null,
                    'description' => $dev['deskripsi'] ?? null,
                ]
            );
        }
    }

    public function mapVisitingScientist(Lecturer $lecturer, array $data): void
    {
        foreach ($data as $visit) {
            VisitingScientist::updateOrCreate(
                [
                    'lecturer_id' => $lecturer->id,
                    'institution' => $visit['institusi_tujuan'] ?? null,
                    'year' => $visit['tahun'] ?? null,
                ],
                [
                    'role' => $visit['peran'] ?? null,
                    'duration' => $visit['durasi'] ?? null,
                ]
            );
        }
    }

    public function mapDetasering(Lecturer $lecturer, array $data): void
    {
        foreach ($data as $detasering) {
            Detasering::updateOrCreate(
                [
                    'lecturer_id' => $lecturer->id,
                    'institution' => $detasering['institusi_tujuan'] ?? null,
                    'year' => $detasering['tahun'] ?? null,
                ],
                [
                    'role' => $detasering['peran'] ?? null,
                    'duration' => $detasering['durasi'] ?? null,
                ]
            );
        }
    }

    public function mapAcademicOration(Lecturer $lecturer, array $data): void
    {
        foreach ($data as $oration) {
            AcademicOration::updateOrCreate(
                [
                    'lecturer_id' => $lecturer->id,
                    'title' => $oration['judul_orasi'] ?? null,
                    'year' => $oration['tahun'] ?? null,
                ],
                [
                    'organizer' => $oration['penyelenggara'] ?? null,
                ]
            );
        }
    }

    public function mapLecturerMentoring(Lecturer $lecturer, array $data): void
    {
        foreach ($data as $mentoring) {
            LecturerMentoring::updateOrCreate(
                [
                    'lecturer_id' => $lecturer->id,
                    'mentee_name' => $mentoring['nama_dosen_dibina'] ?? null,
                    'year' => $mentoring['tahun'] ?? null,
                ],
                [
                    'program' => $mentoring['program'] ?? null,
                    'duration' => $mentoring['durasi'] ?? null,
                ]
            );
        }
    }

    public function mapAdditionalTask(Lecturer $lecturer, array $data): void
    {
        foreach ($data as $task) {
            AdditionalTask::updateOrCreate(
                [
                    'lecturer_id' => $lecturer->id,
                    'task_name' => $task['nama_tugas'] ?? null,
                    'year' => $task['tahun'] ?? null,
                ],
                [
                    'institution' => $task['institusi'] ?? null,
                    'duration' => $task['durasi'] ?? null,
                ]
            );
        }
    }
}
