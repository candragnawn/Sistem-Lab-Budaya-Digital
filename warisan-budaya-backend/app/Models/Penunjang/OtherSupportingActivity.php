<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
class OtherSupportingActivity extends Model
{
    protected $fillable = [
        'activity_name',
        'organizing_institution',
        'decree_number',
        'start_date',
        'end_date',
        'role'
    ];

    public function lecturer(): BelongsTo
    {
        return $this->belongsTo(Lecturer::class);

    }
}
