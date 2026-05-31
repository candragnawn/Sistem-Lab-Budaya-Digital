<?php

namespace App\Models\PelaksanaanPenelitian;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use App\Models\Lecturer;

class Publication extends Model
{
    protected $table = "publications";

    protected $fillable = [
        'lecturer_id',
        'publication_id', 
        'title', 
        'category', 
        'type' ,
        'source', 
        'quartile',  
        'journal_name', 
        'issn', 
        'doi', 
        'is_verified', 
        'year', 
        'url'
    ];
    public function lecturer(): BelongsToMany{
            return $this->belongsToMany(Lecturer::class, 'publication_authors');
        }

}
