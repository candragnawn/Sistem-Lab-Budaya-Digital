<?php

namespace App\Models\Profile;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Lecturer;

class Address extends Model
{
    protected $table = 'lecturer_addresses';
    
    protected $fillable = [
        'lecturer_id',
        'email',
        'address',
        'rt',
        'rw',
        'village',
        'district',
        'province',
        'postal_code',
        'phone_number'
    ];

    public function lecturer(): BelongsTo {
        return $this->belongsTo(Lecturer::class, 'lecturers_id');
    }
}
