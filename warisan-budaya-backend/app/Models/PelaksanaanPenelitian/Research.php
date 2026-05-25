<?php

namespace App\Models\PelaksanaanPenelitian;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Lecturer;

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
