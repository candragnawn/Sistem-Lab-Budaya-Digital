<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class StructuralPosition extends Model
{
    protected $fillable = [
        'lecturer_id',
        'structural_position',
        'decree_number',
        'start_date',
        'end_date'
    ];

    public function lecturer(): BelongsTo {
        return $this->belongsTo(Lecturer::class);
    }
}
