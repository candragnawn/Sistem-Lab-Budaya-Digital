<?php

namespace App\Models\Profile;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Lecturer;

class Employment extends Model
{
    protected $table = 'lecturer_employments';

    protected $fillable = [
        'lecturer_id',
        'nip',
        'sk_cpns_number',
        'sk_cpns_date',
        'rank_group',
        'sk_date',
        'work_years',
        'work_months',
        'employment_status',
        'active_status'
    ];

    public function lecturer(): BelongsTo
    {
        return $this->belongsTo(Lecturer::class, 'lecturer_id');
    }
}
