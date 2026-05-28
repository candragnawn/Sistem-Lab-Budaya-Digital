<?php

namespace App\Models\Profile;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Lecturer;

class ProfessorEmeritus extends Model
{
    protected $table = "";


    protected $fillable = [
        'lecturer_id',
        'title_name',
        'university',
        'start_date',
        'end_date'
    ];

    public function lecturer(): BelongsTo
    {
        return $this->belongsTo(Lecturer::class, 'lecturer_id');
    }
}
