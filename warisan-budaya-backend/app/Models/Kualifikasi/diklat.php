<?php

namespace App\Models\Kualifikasi;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Lecturer;
class diklat extends Model
{
    protected $fillable = [
        'Lecturers_id',
        'training_name',
        'training_type',
        'organizer',
        'year',
        'status',
    ];

    public function Lecturers(): BelongsTo
    {
        return $this->belongsTo(Lecturer::class);

    }
}
