<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class certification extends Model
{
    protected $fillable = [
        'certification_type',
        'study_type',
        'educator_registration_number',
        'certificate_sk_number',
        'certification_year',
    ];

    public function lecturer(): BelongsTo
    {
        return $this->belongsTo(Lecturer::class);
    }
}
