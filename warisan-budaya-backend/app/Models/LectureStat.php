<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class LecturerStat extends Model
{
    public $table = 'v_lecturer_stats';
    public $timestamps = false;
    protected $primaryKey = 'lecturer_id';

    public function Lecturer() {
        return $this->belongsTo(Lecturer::class);
    }
}
