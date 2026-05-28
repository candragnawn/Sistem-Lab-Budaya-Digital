<?php

namespace App\Models\PelaksanaanPengabdian;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Lecturer;

class Speaker extends Model
{
    protected $table = 'speaker';
    protected $fillable = [
        'lecturer_id',
        'activity_category',
        'paper_title',
        'guest_lecturer_name',
        'organizer',
        'activity_date',
    ];

    public function lecturer(): BelongsTo {
    return $this->belongsTo(Lecturer::class);
    }
}
