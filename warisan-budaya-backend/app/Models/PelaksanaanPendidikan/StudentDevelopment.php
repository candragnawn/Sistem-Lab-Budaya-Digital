<?php

namespace App\Models\PelaksanaanPendidikan;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Lecturer;

class StudentDevelopment extends Model
{
    protected $table = "student_developments";

    protected $fillable = [
        'lecturer_id',
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
