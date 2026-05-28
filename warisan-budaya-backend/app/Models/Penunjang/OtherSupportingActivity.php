<?php

namespace App\Models\Penunjang;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Lecturer;
class OtherSupportingActivity extends Model
{
    protected $table = 'other_supporting_activity';
    protected $fillable = [
        'lecturer_id',
        'activity_name',
        'organizing_institution',
        'decree_number',
        'start_date',
        'end_date',
        'role'
    ];

    public function lecturer(): BelongsTo
    {
        return $this->belongsTo(Lecturer::class);

    }
}
