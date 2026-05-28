<?php

namespace App\Models\Profile;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Lecturer;

class LecturerStat extends Model
{
    public $table = 'Lecturers_stats';
    public $timestamps = false;
    protected $primaryKey = 'Lecturers_id';
    public $incrementing = false;

    protected $fillable = [
        'Lecturers_id',
        'total_publications',
        'total_citations',
        'total_students'
    ];

    public function Lecturers(): BelongsTo {
        return $this->belongsTo(Lecturer::class, 'Lecturers_id');
    }
}
