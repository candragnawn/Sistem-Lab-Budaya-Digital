<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Publication extends Model
{
public function lecturer(): BelongsTo
    {
        return $this->belongsTo(Lecturer::class);
    }

public function category(): BelongsTo {
    return $this->belongsTo(Category::class);
}
}
