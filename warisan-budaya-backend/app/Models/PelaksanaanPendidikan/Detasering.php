<?php

namespace App\Models\PelaksanaanPendidikan;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Lecturer;
class Detasering extends Model
{
    protected $table = "";

    protected $fillable = [
        'lecturer_id',
        'target_university',
        'activity_category',
        'assignment_decree_number',
        'decree_date',
    ];

    public function lecturer(): BelongsTo
    {
        return $this->belongsTo(Lecturer::class);

    }
}
