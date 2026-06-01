<?php

namespace App\Models\Profile;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Lecturer;

class Position extends Model
{
    protected $table = 'functional_positions';

    protected $fillable = [
        'lecturer_id',
        'position_name',
        'sk_number',
        'sk_date',
        'tmt'
    ];

    public function lecturer(): BelongsTo {
        return $this->belongsTo(Lecturer::class);
    }
}
