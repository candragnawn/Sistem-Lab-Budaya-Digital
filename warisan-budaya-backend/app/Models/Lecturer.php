<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Lecturer extends Model
{
    protected $table = 'lecturers';
    protected $fillable = [
        'nip', 'name', 'email', 'title_prefix', 'title_suffix', 
        'bio', 'education', 'status', 'photo_path'
    ];

    public function publications(): HasMany 
    {
        return $this->hasMany(Publication::class);

    }
    public function digitalAssets(): HasMany 
    {
        return $this->hasMany(DigitalAsset::class);

    }
    //
}
