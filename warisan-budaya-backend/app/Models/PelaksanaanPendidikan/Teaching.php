<?php

namespace App\Models\PelaksanaanPendidikan;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Lecturer;
class Teaching extends Model
{
    protected $table = "";

    protected $fillable = [
        'lecturer_id',
        'course_name',
        'course_type',
        'scientific_field',
        'class',
        'student_count',
        'credits',
    ];

    public function lecturer(): BelongsTo
    {
        return $this->belongsTo(Lecturer::class);

    }
}
