<?php

namespace App\Models\PelaksanaanPenelitian;

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
        'quartile',
        'certificate_number',
        'publish_date'
    ];

    public function lecturer(): BelongsTo {
        return $this->belongsTo(Lecturer::class, 'lecturer_id');
    }
}
