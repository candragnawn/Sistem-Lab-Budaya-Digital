<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;
use App\Models\Profile\WorkContracts;
use App\Models\Profile\Rank;
use App\Models\Profile\Position;
use App\Models\Profile\stat;
use App\Models\Profile\Academic;
use App\Models\Profile\Address;
use App\Models\Profile\Family;
use App\Models\Profile\Identity;
use App\Models\Profile\Employment;
use App\Models\Profile\Inpassing;
use App\Models\Academic\LecturerStudy;
use App\Models\Academic\LecturerEducation;
use App\Models\Academic\LecturerTeaching;
use App\Models\PelaksanaanPenelitian\Publication;


class Lecturer extends Model
{
    protected $table = 'lecturer';
    protected $fillable = [
         'nip','name', 'email', 'title_prefix', 'title_suffix', 
        'bio', 'education', 'status', 'photo_path'
    ];
    
    public function workContracts(): HasMany {
         return $this->hasMany(WorkContracts::class); 
         }
    public function education(): HasMany {
        return $this->hasMany(LecturerEducation::class);
    }

    public function ranks(): HasMany {
        return $this->hasMany(Rank::class);
    }
    public function positions(): HasMany {
        return $this->hasMany(Position::class);
    }
    public function teachings(): HasMany {
        return $this->hasMany(LecturerTeaching::class)->orderBy('academic_year', 'desc');
    }

    public function publications(): HasMany 
    {
        return $this->hasMany(Publication::class);

    }


    public function studies(): HasMany {
        return $this->hasMany(LecturerStudy::class);
    }

    // Profile Relations
    public function academic(): HasOne {
        return $this->hasOne(Academic::class, 'lecturers_id');
    }

    public function addresses(): HasMany {
        return $this->hasMany(Address::class, 'lecturers_id');
    }

    public function families(): HasMany {
        return $this->hasMany(Family::class, 'lecturers_id');
    }

    public function identities(): HasMany {
        return $this->hasMany(Identity::class, 'lecturers_id');
    }

    public function employments(): HasMany {
        return $this->hasMany(Employment::class, 'lecturers_id');
    }

    public function inpassings(): HasMany {
        return $this->hasMany(Inpassing::class, 'lecturers_id');
    }
}
