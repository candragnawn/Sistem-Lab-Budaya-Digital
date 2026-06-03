<?php

namespace App\Models\Kualifikasi;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Lecturer;
class Diklat extends Model
{
    protected $table = "diklats";

    protected $fillable = [
        'lecturer_id',
        'training_name',
        'training_type',
        'organizer',
        'year',
        'status',
    ];

    public function Lecturer(): BelongsTo
    {
        return $this->belongsTo(Lecturer::class);

    }
}
