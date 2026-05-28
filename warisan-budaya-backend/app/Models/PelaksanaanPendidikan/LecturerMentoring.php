<?php

namespace App\Models\PelaksanaanPendidikan;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Lecturer;
class LecturerMentoring extends Model
{
    protected $table = "";

    protected $fillable = [
        'lecturer_id',
        'mentor_name',
        'start_date',
        'end_date',
    ];

    public function lecturer(): BelongsTo
    {
        return $this->belongsTo(Lecturer::class);

    }
}
