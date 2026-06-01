<?php

namespace App\Models\PelaksanaanPengabdian;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Lecturer;


class CommunityService extends Model
{
    protected $table = "community_services";

    protected $fillable = [
        'lecturer_id',
        'title',
        'scientific_field',
        'implementation_year', 
        'duration'
    ];

    public function lecturer(): BelongsTo {
    return $this->belongsTo(Lecturer::class);
    }
}
