<?php

namespace App\Models\Kompetensi;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Lecturer;

class test extends Model
{
    protected $fillable = [
        'Lecturer_id',
        'test_name',
        'test_score',
        'organizer',
        'year',
    ];

    public function Lecturers(): BelongsTo
    {
        return $this->belongsTo(Lecturer::class);

    }
}
