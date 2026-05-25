<?php

namespace App\Models\PelaksanaanPendidikan;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Lecturer;

class StudentExamination extends Model
{
    protected $fillable = [
        'lecturer_id',
        'examination_title',
        'scientific_field',
        'examination_type',
        'study_program',
    ];

    public function lecturer(): BelongsTo
    {
        return $this->belongsTo(Lecturer::class);

    }
}
