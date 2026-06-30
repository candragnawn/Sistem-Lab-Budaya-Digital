<?php

namespace App\Models\Profile;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Lecturer;

class Position extends Model
{
    protected $table = 'functional_positions';

    protected $fillable = [
        'lecturer_id',
        'functional_position',
        'decree_number',
        'decree_date',
        'effective_date',
        'civil_servant_status'
    ];

    public function lecturer(): BelongsTo {
        return $this->belongsTo(Lecturer::class);
    }
}
