<?php

namespace App\Models\Profile;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Lecturer;

class Placement extends Model
{
    protected $table = "";

    protected $fillable = [
        'lecturer_id',
        'status',
        'employment_bond',
        'education_level',
        'unit',
        'university',
        'start_date',
        'exit_date',
        'end_date',
        'assignment_homebase'
    ];

    public function lecturer(): BelongsTo
    {
        return $this->belongsTo(Lecturer::class, 'lecturer_id');
    }
}
