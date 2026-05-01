<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LecturerWorkContracts extends Model
{

public $fillable = [
   'lecturer_id',
   'work_status',
   'current_status',
   'tmt'

];
 public function Lecturer(): BelongsTo {
    return $this->belongsTo(Lecturer::class);
 }
}
