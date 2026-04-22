<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;


class LecturerPosition extends Model
{

protected $fillable = [
    'lecturer_id',
    'position_name',
    'sk_number',
    'sk_date',
    'tmt'
];
public function lecturer(): BelongsTo  {
    return $this->belongsTo(Lecturer::class);

}
}
