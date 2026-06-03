<?php

namespace App\Models\Kompetensi;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Lecturer;
class Certification extends Model
{
    protected $table = "certificates";
    protected $fillable = [
        'lecturer_id',
        'certification_type',
        'study_type',
        'educator_registration_number',
        'certificate_sk_number',
        'certification_year',
    ];

    public function lecturer(): BelongsTo
    {
        return $this->belongsTo(Lecturer::class);
    }
}
