<?php

namespace App\Models\Profile;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Lecturer;

class HKI extends Model
{
    protected $table = 'lecturer_hkis';
    
    protected $fillable = [
        'lecturer_id',
        'hki_type',
        'title',
        'certificate_number',
        'issue_date',
        'description'
    ];

    public function lecturer(): BelongsTo {
        return $this->belongsTo(Lecturer::class, 'lecturer_id');
    }
}
