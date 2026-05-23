<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class employment_history extends Model
{
    protected $fillable = [
        'nip',
        'sk_cpns_number',
        'sk_cpns_date',
        'rank_group',
        'sk_date',
        'work_years',
        'work_months',
        'employment_status',
        'active_status',
    ];

    public function lecturer(): BelongsTo
    {
        return $this->belongsTo(Lecturer::class);

    }
}
