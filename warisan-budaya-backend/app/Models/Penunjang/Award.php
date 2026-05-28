<?php


namespace App\Models\Penunjang;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Lecturer; 

class Award extends Model
{
    protected $table = 'award';
    protected $fillable = [
        'lecturer_id',
        'award_name',
        'award_type',
        'institution',
        'year',
    ];

    public function lecturer(): BelongsTo
    {
        return $this->belongsTo(Lecturer::class);

    }
}
