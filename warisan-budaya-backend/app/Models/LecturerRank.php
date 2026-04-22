<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LecturerRank extends Model
{

protected $fillable = [
      'lecturer_id',
      'rank_name',
      'sk_number',
      'sk_date',
      'tmt',
      'received_date'
];
 public function Lecturer(): BelongsTo {
    return $this->belongsTo(Lecturer::class);
 }
}
