<?php

namespace App\Models\Reward;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Lecturer;
class Allowance extends Model
{
    protected $table = "allowances";

    protected $fillable = [
        'lecturer_id',
        'allowance_type',
        'allowance_name',
        'granting_institution',
        'funding_source',
        'start_year',
        'end_year',
        'amount'
    ];

    public function lecturer(): BelongsTo {
        return $this->belongsTo(Lecturer::class);
    }
}
