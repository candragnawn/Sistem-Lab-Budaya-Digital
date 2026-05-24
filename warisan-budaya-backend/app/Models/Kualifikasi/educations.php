<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class educations extends Model
{
    protected $fillable = [
        'entry_year',
        'level',
        'country',
        'university',
        'study_program',
        'graduation_year',
        'predicate',
    ];

    public function lecturer(): BelongsTo
    {
        return $this->belongsTo(Lecturer::class);

    }
}
