<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
class ProfessionalMembership extends Model
{
    protected $fillable = [
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
