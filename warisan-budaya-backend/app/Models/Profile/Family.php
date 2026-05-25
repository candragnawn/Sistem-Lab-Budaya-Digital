<?php

namespace App\Models\Profile;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Lecturer;

class Family extends Model
{
    protected $table = 'lecturer_families';
    
    protected $fillable = [
        'lecturer_id',
        'marital_status',
        'spouse_name',
        'spouse_nip',
        'spouse_occupation'
    ];

    public function lecturer(): BelongsTo {
        return $this->belongsTo(Lecturer::class, 'lecturer_id');
    }
}
