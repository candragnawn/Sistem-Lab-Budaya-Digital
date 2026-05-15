<?php

namespace App\Models\Profile;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Lecturer;

class Identity extends Model
{
    protected $table = 'lecturer_identities';
    
    protected $fillable = [
        'lecturer_id',
        'id_type',
        'id_number',
        'id_issued_date',
        'id_expiry_date',
        'id_issuing_authority'
    ];

    public function lecturer(): BelongsTo {
        return $this->belongsTo(Lecturer::class, 'lecturer_id');
    }
}
