<?php

namespace App\Models\Profile;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Lecturer;

class LecturerStat extends Model
{
    public $table = 'lecturer_stats';
    public $timestamps = false;
    protected $primaryKey = 'lecturer_id';
    public $incrementing = false;

    protected $fillable = [
        'lecturer_id',
        'total_publications',
        'total_citations',
        'total_students'
    ];

    public function lecturer(): BelongsTo {
        return $this->belongsTo(Lecturer::class, 'lecturer_id');
    }
}
