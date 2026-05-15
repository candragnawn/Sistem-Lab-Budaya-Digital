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
        'position_title',
        'institution',
        'start_date',
        'end_date',
        'status'
    ];

    public function lecturer(): BelongsTo {
        return $this->belongsTo(Lecturer::class, 'lecturer_id');
    }
}
