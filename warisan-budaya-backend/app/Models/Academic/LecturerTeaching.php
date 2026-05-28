<?php

namespace App\Models\Academic;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Lecturer;
class LecturerTeaching extends Model
{
protected $table = 'lecturer_teaching';
protected $fillable = [
    'lecturer_id',
    'course_name',
    'course_type',
    'scientific_field',
    'class',
    'student_count',
    'credits'

];
 public function lecturer(): BelongsTo  {
    return $this->belongsTo(Lecturer::class);

}
}
