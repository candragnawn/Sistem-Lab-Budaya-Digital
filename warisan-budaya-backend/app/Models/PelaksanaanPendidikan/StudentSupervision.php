<?php

namespace App\Models\PelaksanaanPendidikan;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Lecturer;
class StudentSupervision extends Model
{
    protected $table = "";

    protected $fillable = [
        'lecturer_id',
        'semester',
        'activity_category',
        'supervision_type',
        'scientific_field',
        'study_program',
    ];

    public function lecturer(): BelongsTo
    {
        return $this->belongsTo(Lecturer::class);

    }
}
