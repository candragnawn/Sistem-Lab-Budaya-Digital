<?php

namespace App\Models\PelaksanaanPendidikan;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Lecturer;
class VisitingScientist extends Model
{
    protected $table = "";

    protected $fillable = [
        'lecturer_id',
        'host_university',
        'duration',
        'activity_date',
    ];

    public function lecturer(): BelongsTo
    {
        return $this->belongsTo(Lecturer::class);

    }
}
