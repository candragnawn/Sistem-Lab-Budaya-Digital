<?php

namespace App\Models\Academic;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Lecturer;
class LecturerStudy extends Model
{

protected $fillable = [
    'lecturer_id',
    'entry_year',
    'level',
    'level',
    'university',
    'study_program',
    'graduation_year',
    'status',


];
public function lecturer(): BelongsTo  {
    return $this->belongsTo(Lecturer::class);

}
}
