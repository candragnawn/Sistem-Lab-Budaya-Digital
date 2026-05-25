<?php

namespace App\Models\Academic;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Lecturer;
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
