<?php

namespace App\Models\Reward;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Lecturer;
class Welfare extends Model
{
    protected $table = 'welfare';
    protected $fillable = [
        'lecturer_id',
        'welfare_type',
        'welfare_service',
        'organizer',
        'start_year',
        'selection_year',
    ];

    public function lecturer(): BelongsTo {
        return $this->belongsTo(Lecturer::class);
    }
}
