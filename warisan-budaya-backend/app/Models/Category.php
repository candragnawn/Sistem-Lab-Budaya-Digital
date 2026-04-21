<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use App\Models\Publication;

class Category extends Model
{
    protected $fillable = ['name', 'slug', 'description', 'icon'];

    public function publications(): HasMany {
        return $this->hasMany(Publication::class);
    }
    public function digitalAssets(): HasMany {
        return $this->hasMany(DigitalAsset::class);
    }

    public function LecturerPosition(): HasMany {
        return $this->hasMany(LecturerPosition::class);
    }
}
