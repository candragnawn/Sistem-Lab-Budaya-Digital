<?php

namespace App\Models\Kompetensi;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Lecturer;

class test extends Model
{
    protected $fillable = [
        'lecturer_id',
        'test_name',
        'test_score',
        'organizer',
        'year',
    ];

    public function lecturer(): BelongsTo
    {
        return $this->belongsTo(Lecturer::class);

    }
}
