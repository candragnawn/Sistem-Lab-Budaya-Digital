<?php

namespace App\Models\PelaksanaanPengabdian;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Lecturer;


class StructuralPosition extends Model
{
    protected $table = "structural_positions";

    protected $fillable = [
        'lecturer_id',
        'structural_position',
        'decree_number',
        'start_date',
        'end_date'
    ];

    public function lecturer(): BelongsTo {
        return $this->belongsTo(Lecturer::class);
    }
}
