<?php

namespace App\Models\PelaksanaanPendidikan;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Lecturer;

class AdditionalTask extends Model
{
    use SoftDeletes;

    protected $table = "additional_tasks";

    protected $fillable = [
        'lecturer_id',
        'additional_task',
        'work_unit',
        'institution',
        'start_date',
        'end_date',
    ];

    public function lecturer(): BelongsTo
    {
        return $this->belongsTo(Lecturer::class);

    }
}
