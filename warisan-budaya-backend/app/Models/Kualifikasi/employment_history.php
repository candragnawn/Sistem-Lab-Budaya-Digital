<?php

namespace App\Models\Kualifikasi;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Lecturer;

class employment_history extends Model
{
    protected $table = "";

    protected $fillable = [
        'Lecturer_id',
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

    public function Lecturers(): BelongsTo
    {
        return $this->belongsTo(Lecturer::class);

    }
}
