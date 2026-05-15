<?php

namespace App\Models\Profile;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Lecturer;

class Academic extends Model
{
    protected $table = 'lecturer_academics';
    
    protected $fillable = [
        'lecturer_id',
        'degree',
        'field_of_study',
        'institution',
        'graduation_year',
        'gpa',
        'thesis_title'
    ];

    public function lecturer(): BelongsTo {
        return $this->belongsTo(Lecturer::class, 'lecturer_id');
    }
}
