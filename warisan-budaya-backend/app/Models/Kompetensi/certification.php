<?php

namespace App\Models\Kompetensi;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Lecturer;
class certification extends Model
{
    protected $table = "certificate";
    protected $fillable = [
        'lecturer_id',
        'certification_type',
        'study_type',
        'educator_registration_number',
        'certificate_sk_number',
        'certification_year',
    ];

    public function Lecturers(): BelongsTo
    {
        return $this->belongsTo(Lecturer::class);
    }
}
