<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Speaker extends Model
{
    protected $fillable = [
        'lecturer_id',
        'activity_category',
        'paper_title',
        'guest_lecturer_name',
        'organizer',
        'activity_date',
    ];

    public function lecturer(): BelongsTo {
    return $this->belongsTo(Lecturer::class);
    }
}
