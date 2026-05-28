<?php

namespace App\Models\Profile;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Lecturer;

class OtherData extends Model
{
    protected $table = 'other_data';
    
    protected $fillable = [
        'lecturer_id',
        'data_key',
        'data_value',
        'notes'
    ];

    public function lecturer(): BelongsTo {
        return $this->belongsTo(Lecturer::class, 'lecturer_id');
    }
}
