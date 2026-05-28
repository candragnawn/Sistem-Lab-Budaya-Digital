<?php

namespace App\Models;


use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

//profile
use App\Models\Profile\Academic;
use App\Models\Profile\Address;
use App\Models\Profile\Employment;
use App\Models\Profile\Family;
use App\Models\Profile\Identity;
use App\Models\Profile\Inpassing;
use App\Models\Profile\LecturerStat;
use App\Models\Profile\OtherData;
use App\Models\Profile\Placement;
use App\Models\Profile\Position;
use App\Models\Profile\ProfessorEmeritus;
use App\Models\Profile\Rank;
use App\Models\Profile\WorkContract;

//academic
use App\Models\Academic\LecturerStudy;
use App\Models\Academic\LecturerEducation;
use App\Models\Academic\LecturerTeaching;
//pelaksanaan pendidikan
use App\Models\PelaksanaanPendidikan\Detasering;
use App\Models\PelaksanaanPendidikan\AcademicOration;
use App\Models\PelaksanaanPendidikan\AdditionalTask;
use App\Models\PelaksanaanPendidikan\LecturerMentoring;
use App\Models\PelaksanaanPendidikan\StudentDevelopment;
use App\Models\PelaksanaanPendidikan\StudentExamination;
use App\Models\PelaksanaanPendidikan\StudentSupervision;
use App\Models\PelaksanaanPendidikan\Teaching;
use App\Models\PelaksanaanPendidikan\TeachingMaterial;
use App\Models\PelaksanaanPendidikan\VisitingScientist;




//pelaksanaan pengabdian
use App\Models\PelaksanaanPengabdian\CommunityService;
use App\Models\PelaksanaanPengabdian\JournalManager;
use App\Models\PelaksanaanPengabdian\Speaker;   
use App\Models\PelaksanaanPengabdian\StructuralPosition;   


//pelaksanaan penelitian
use App\Models\PelaksanaanPenelitian\Publication;
use App\Models\PelaksanaanPenelitian\Research;
use App\Models\PelaksanaanPenelitian\HKI;
use App\Models\PelaksanaanPenelitian\PublicationAuthor;


//pelaksanaan kualifikasi
use App\Models\Kualifikasi\diklat;
use App\Models\Kualifikasi\educations;
use App\Models\Kualifikasi\employment_history;

//pelaksanaan kompetensi
use App\Models\Kompetensi\certification;
use App\Models\Kompetensi\test;

//pelaksanaan penunjang
use App\Models\Penunjang\Award;
use App\Models\Penunjang\OtherSupportingActivity;
use App\Models\Penunjang\ProfessionalMembership;

//pelaksanaan reward
use App\Models\Reward\Allowance;
use App\Models\Reward\Scholarship;
use App\Models\Reward\Welfare;


class Lecturer extends Model
{
    protected $table = 'lecturers';
    protected $fillable = [
         'nip','name', 'email', 'title_prefix', 'title_suffix', 
        'bio', 'education', 'status', 'photo_path'
    ];
    // 


public function academic(): HasOne
    {
        return $this->hasOne(Academic::class, 'lecturer_id');
    }


    public function addresses(): HasMany
    {
        return $this->hasMany(Address::class, 'lecturer_id');
    }

   
    public function employments(): HasMany
    {
        return $this->hasMany(Employment::class, 'lecturer_id');
    }

  
    public function families(): HasMany
    {
        return $this->hasMany(Family::class, 'lecturer_id');
    }

    // Identitas (KTP, passport, NPWP)
    public function identities(): HasMany
    {
        return $this->hasMany(Identity::class, 'lecturer_id');
    }


    public function inpassings(): HasMany
    {
        return $this->hasMany(Inpassing::class, 'lecturer_id');
    }

    // Statistik dosen
    public function stats(): HasMany
    {
        return $this->hasMany(LecturerStat::class, 'lecturer_id');
    }

 
    public function otherData(): HasMany
    {
        return $this->hasMany(OtherData::class, 'lecturer_id');
    }

    public function placements(): HasMany
    {
        return $this->hasMany(Placement::class, 'lecturer_id');
    }

 
    public function positions(): HasMany
    {
        return $this->hasMany(Position::class, 'lecturer_id');
    }

   
    public function professorEmeritus(): HasMany
    {
        return $this->hasMany(ProfessorEmeritus::class, 'lecturer_id');
    }

   
    public function ranks(): HasMany
    {
        return $this->hasMany(Rank::class, 'lecturer_id');
    }

    
    public function workContracts(): HasMany
    {
        return $this->hasMany(WorkContract::class, 'lecturer_id');
    }

    
    public function hki(): HasMany
    {
        return $this->hasMany(HKI::class, 'lecturer_id');
    }


    public function publicationAuthors(): HasMany
    {
        return $this->hasMany(PublicationAuthor::class, 'lecturer_id');
    }

  
    public function lecturerEducations(): HasMany
    {
        return $this->hasMany(LecturerEducation::class, 'lecturer_id');
    }

    public function teachings(): HasMany
    {
        return $this->hasMany(LecturerTeaching::class, 'lecturer_id')
                    ->orderBy('academic_year', 'desc');
    }

  
    public function detaserings(): HasMany
    {
        return $this->hasMany(Detasering::class, 'lecturer_id');
    }


    public function academicOrations(): HasMany
    {
        return $this->hasMany(AcademicOration::class, 'lecturer_id');
    }


    public function additionalTasks(): HasMany
    {
        return $this->hasMany(AdditionalTask::class, 'lecturer_id');
    }

 
    public function lectureMentorings(): HasMany
    {
        return $this->hasMany(LecturerMentoring::class, 'lecturer_id');
    }


    public function studentDevelopments(): HasMany
    {
        return $this->hasMany(StudentDevelopment::class, 'lecturer_id');
    }

    public function studentExaminations(): HasMany
    {
        return $this->hasMany(StudentExamination::class, 'lecturer_id');
    }

  
    public function studentSupervisions(): HasMany
    {
        return $this->hasMany(StudentSupervision::class, 'lecturer_id');
    }

    public function teachingActivities(): HasMany
    {
        return $this->hasMany(Teaching::class, 'lecturer_id');
    }


    public function teachingMaterials(): HasMany
    {
        return $this->hasMany(TeachingMaterial::class, 'lecturer_id');
    }

 
    public function visitingScientists(): HasMany
    {
        return $this->hasMany(VisitingScientist::class, 'lecturer_id');
    }


    public function communityServices(): HasMany
    {
        return $this->hasMany(CommunityService::class, 'lecturer_id');
    }

    public function journalManagers(): HasMany
    {
        return $this->hasMany(JournalManager::class, 'lecturer_id');
    }


    public function speakers(): HasMany
    {
        return $this->hasMany(Speaker::class, 'lecturer_id');
    }


    public function structuralPositions(): HasMany
    {
        return $this->hasMany(StructuralPosition::class, 'lecturer_id');
    }

  
    public function publications(): HasMany
    {
        return $this->hasMany(Publication::class, 'lecturer_id');
    }

    public function research(): HasMany
    {
        return $this->hasMany(Research::class, 'lecturer_id');
    }


    public function diklats(): HasMany
    {
        return $this->hasMany(Diklat::class, 'lecturer_id');
    }

  
    public function educationHistories(): HasMany
    {
        return $this->hasMany(Educations::class, 'lecturer_id');
    }

  
    public function employmentHistories(): HasMany
    {
        return $this->hasMany(employment_history::class, 'lecturer_id');
    }


    public function certifications(): HasMany
    {
        return $this->hasMany(Certification::class, 'lecturer_id');
    }

    // Uji kompetensi
    public function competencyTests(): HasMany
    {
        return $this->hasMany(Test::class, 'lecturer_id');
    }


    public function awards(): HasMany
    {
        return $this->hasMany(Award::class, 'lecturer_id');
    }


    public function otherSupportingActivities(): HasMany
    {
        return $this->hasMany(OtherSupportingActivity::class, 'lecturer_id');
    }

    public function professionalMemberships(): HasMany
    {
        return $this->hasMany(ProfessionalMembership::class, 'lecturer_id');
    }

    public function allowances(): HasMany
    {
        return $this->hasMany(Allowance::class, 'lecturer_id');
    }

    // Beasiswa
    public function scholarships(): HasMany
    {
        return $this->hasMany(Scholarship::class, 'lecturer_id');
    }

  
    public function welfares(): HasMany
    {
        return $this->hasMany(Welfare::class, 'lecturer_id');
    }
    
}
