<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Research extends Model
{
    protected $fillable = [
        'title',
        'scientific_field',
        'implementation_year',
        'duration',
    ];

    public function lecturer(): BelongsTo {
    return $this->belongsTo(Lecturer::class);
    }
}
