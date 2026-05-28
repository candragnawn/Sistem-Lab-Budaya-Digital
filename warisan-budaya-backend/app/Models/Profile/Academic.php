<?php

namespace App\Models\Profile;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Lecturer;

class Academic extends Model
{
    protected $table = 'academic';
    
    protected $fillable = [
        'lecturer_id',
        'science_cluster',
        'science_tree',
        'science_branch',
        'sinta_id'
    ];

    public function Lecturers(): BelongsTo {
        return $this->belongsTo(Lecturer::class, 'lecturer_id');
    }
}
