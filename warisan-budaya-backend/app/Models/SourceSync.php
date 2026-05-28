<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SourceSync extends Model
{
    protected $table = 'source_sync';

    protected $fillable = [
        'source',
        'status',
        'total_synced',
        'error_message',
        'started_at',
        'finished_at',
    ];
}
