<?php

namespace App\Models\Profile;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Lecturer;

class Inpassing extends Model
{
    protected $table = 'lecturer_inpassings';
    
    protected $fillable = [
        'lecturer_id',
        'inpassing_date',
        'inpassing_type',
        'notes',
        'verified_at',
        'verified_by'
    ];

    public function lecturer(): BelongsTo {
        return $this->belongsTo(Lecturer::class, 'lecturer_id');
    }
}
