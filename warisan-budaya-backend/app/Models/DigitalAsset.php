<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use App\Models\Lecturer;
use App\Models\Category;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;


class DigitalAsset extends Model
{
    public function Lecture(): BelongsTo {
        return $this->belongsTo(Lecturer::class);
    }


    public function Category(): BelongsTo {
        return $this->belongsTo(Category::class);
    }
}
