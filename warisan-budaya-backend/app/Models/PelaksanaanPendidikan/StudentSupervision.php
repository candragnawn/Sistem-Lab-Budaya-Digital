<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StudentSupervision extends Model
{
    protected $fillable = [
        'semester',
        'activity_category',
        'supervision_type',
        'scientific_field',
        'study_program',
    ];

    public function lecturer(): BelongsTo
    {
        return $this->belongsTo(Lecturer::class);

    }
}
