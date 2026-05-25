<?php

namespace App\Models\Profile;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Lecturer;

class Inpassing extends Model
{
    protected $table = 'lecturer_inpassings';
    
    protected $fillable = [
        'lecturer_id',
        'rank_group',
        'decree_number',
        'effective_date',
        'notes'
    ];

    public function lecturer(): BelongsTo {
        return $this->belongsTo(Lecturer::class, 'lecturers_id');
    }
}
