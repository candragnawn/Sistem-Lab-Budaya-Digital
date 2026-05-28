<?php

namespace App\Models\Profile;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Lecturer;

class WorkContract extends Model
{
    protected $table = 'lecturer_work_contract';

    protected $fillable = [
        'lecturer_id',
        'work_status',
        'current_status',
        'tmt'
    ];

    public function lecturer(): BelongsTo {
        return $this->belongsTo(Lecturer::class);
    }
}
