<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StudentDevelopment extends Model
{
    protected $fillable = [
        'semester',
        'activity_category',
        'guidance_title',
        'guidance_type',
        'study_program',
    ];

    public function lecturer(): BelongsTo
    {
        return $this->belongsTo(Lecturer::class);

    }
}
