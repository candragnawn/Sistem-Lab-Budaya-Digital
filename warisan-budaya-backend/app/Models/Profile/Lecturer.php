<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;


class Lecturer extends Model
{
    protected $table = 's';
    protected $fillable = [
        'nip', 'name', 'email', 'title_prefix', 'title_suffix', 
        'bio', 'education', 'status', 'photo_path'
    ];
    
    public function workContracts(): HasMany {
         return $this->hasMany(WorkContracts::class); 
         }
    public function education(): HasMany {
        return $this->hasMany(Education::class);
    }

    public function ranks(): HasMany {
        return $this->hasMany(Rank::class);
    }
    public function positions(): HasMany {
        return $this->hasMany(Position::class);
    }
    public function teachings(): HasMany {
        return $this->hasMany(Teaching::class)->orderBy('academic_year', 'desc');
    }

    public function publications(): HasMany 
    {
        return $this->hasMany(Publication::class);

    }

    public function stats(): HasOne {
        return $this->hasOne(Stat::class, '_id');
    }

    public function studies(): HasMany {
        return $this->hasMany(Study::class);
    }
    public function digitalAssets(): HasMany 
    {
        return $this->hasMany(DigitalAsset::class);

    }
    public function events() {
        return $this->belongsToMany(Event::class, 'event_')
        ->withPivot('role_in_event', 'event_date');
    }
    //
}
