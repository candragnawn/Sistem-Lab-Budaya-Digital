<?php

namespace App\Models\Kualifikasi;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Lecturer;
class LecturerEducation extends Model
{

protected $table = "educations";
protected $fillable = [
    'lecturer_id',
    'entry_year',
    'level',
    'country',
    'university',
    'study_program',
    'status',
    'study_type',
    'scholarship',
    'graduation_year',
    'predicate'
];
    public function lecturer(): BelongsTo  {
    return $this->belongsTo(Lecturer::class);

}
}
