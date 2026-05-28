<?php

namespace App\Models\Penunjang;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Lecturer;
class ProfessionalMembership extends Model
{
    protected $fillable = [
        'lecturer_id',
        'organization_name',
        'role',
        'membership_start',
        'membership_end',
        'professional_institution'
    ];

    public function lecturer(): BelongsTo
    {
        return $this->belongsTo(Lecturer::class);

    }
}
