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
        'address_type',
        'street',
        'village',
        'subdistrict',
        'district',
        'province',
        'postal_code',
        'country'
    ];

    public function lecturer(): BelongsTo {
        return $this->belongsTo(Lecturer::class, 'lecturer_id');
    }
}
