<?php

namespace App\Models\Kualifikasi;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Lecturer;

class educations extends Model
{
    protected $fillable = [
        'Lecturers_id',
        'entry_year',
        'level',
        'country',
        'university',
        'study_program',
        'graduation_year',
        'predicate',
    ];

    public function Lecturers(): BelongsTo
    {
        return $this->belongsTo(Lecturer::class);

    }
}
