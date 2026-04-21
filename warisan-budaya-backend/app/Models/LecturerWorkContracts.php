<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class lecturer_work_contracts extends Model
{
 public function Lecturer(): BelongsTo {
    return $this->belongsTo(Lecturer::class);
 }
}
