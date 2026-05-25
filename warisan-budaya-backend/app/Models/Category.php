<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\PelaksanaanPenelitian\Publication;
use App\Models\Profile\Position;

class Category extends Model
{
    protected $fillable = ['name', 'slug', 'description', 'icon'];
    protected $table = 'categories';

    public function publications(): HasMany {
        return $this->hasMany(Publication::class);
    }

    public function LecturerPosition(): HasMany {
        return $this->hasMany(Position::class);
    }

}
