<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class LecturerTeaching extends Model
{

protected $fillable = [
    'lecturer_id',
    'academic_year',
    'course_code',
    'course_name',
    'credits',
    'class_name'

];
 public function lecturer(): BelongsTo  {
    return $this->belongsTo(Lecturer::class);

}
}
