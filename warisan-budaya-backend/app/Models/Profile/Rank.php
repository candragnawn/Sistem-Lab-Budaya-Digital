<?php

namespace App\Models\Profile;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Lecturer;

class Rank extends Model
{
    protected $table = 'lecturer_ranks';

    protected $fillable = [
        'lecturer_id',
        'rank_name',
        'sk_number',
        'sk_date',
        'tmt',
        'received_date'
    ];

    public function lecturer(): BelongsTo {
        return $this->belongsTo(Lecturer::class);
    }
}
