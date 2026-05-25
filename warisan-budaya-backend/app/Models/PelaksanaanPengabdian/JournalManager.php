<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
class JournalManager extends Model
{
    protected $fillable = [
        'lecturer_id',
        'journal_name',
        'decree_number',
        'effective_date',
        'end_date',
        'is_active',
        'role'
    ];

    public function lecturer(): BelongsTo {
    return $this->belongsTo(Lecturer::class);
    }
}
