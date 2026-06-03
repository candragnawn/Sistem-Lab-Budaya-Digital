<?php

namespace App\Models\PelaksanaanPendidikan;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Lecturer;
use Illuminate\Database\Eloquent\SoftDeletes;

class Teaching extends Model
{
    use SoftDeletes;

    protected $table = "teachings";

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
