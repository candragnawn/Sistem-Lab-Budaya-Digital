<?php

namespace App\Models\PelaksanaanPendidikan;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Lecturer;
class AcademicOration extends Model
{
    protected $table = 'academic_oration';
    protected $fillable = [
        'lecturer_id',
        'activity_category',
        'paper_title',
        'guest_lecturer_name',
        'organizer',
        'activity_date',
    ];

    public function lecturer(): BelongsTo
    {
        return $this->belongsTo(Lecturer::class);

    }
}
