<?php

namespace App\Models\Reward;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Lecturer;
class  extends Model
{
    use SoftDeletes;

    protected $table = "scholarships";

    protected $fillable = [
        'lecturer_id',
        'scholarship_type',
        'scholarship_name',
        'start_year',
        'end_year',
        'is_active',
    ];

    public function lecturer(): BelongsTo {
        return $this->belongsTo(Lecturer::class);
    }
}
