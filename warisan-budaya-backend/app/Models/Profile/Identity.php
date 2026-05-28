<?php

namespace App\Models\Profile;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Lecturer;

class Identity extends Model
{
    protected $table = 'identity';
    
    protected $fillable = [
        'lecturer_id',
        'nik',
        'religion',
        'citizenship',
        'npwp'
    ];

    public function lecturer(): BelongsTo {
        return $this->belongsTo(Lecturer::class, 'lecturer_id');
    }
}
