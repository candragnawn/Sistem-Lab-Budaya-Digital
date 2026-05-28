<?php

namespace App\Models\Academic;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Lecturer;
class LecturerStudy extends Model
{
protected $table = "studies";
protected $fillable = [
    'lecturer_id',
    'entry_year',
    'level',
    'university',
    'study_program',
    'scholarship',
    'status',
    'Types_of_Learning',

];
public function lecturer(): BelongsTo  {
    return $this->belongsTo(Lecturer::class);

}
}
