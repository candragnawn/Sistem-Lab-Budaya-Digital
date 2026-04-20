<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LecturerTeaching extends Model
{
 public function lecturer(): BelongsTo  {
    return $this->belongsTo(Lecturer::class);

}
}
