<?php

namespace App\Models\PelaksanaanPenelitian;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Lecturer;
use App\Models\Category;

class Publication extends Model
{
    protected $fillable = [
        'lecturer_id','publication_author_id', 'title', 'category', 'type' ,'source', 'quartile', 'document_url', 'is_verified', 'year', 'url'
    ];
    public function lecturer(): BelongsTo{
            return $this->belongsTo(Lecturer::class);
        }

    public function category(): BelongsTo {
        return $this->belongsTo(Category::class);
    }

    public function publication_authors(): BelongsTo {
        return $this->belongsTo(PublicationAuthor::class);
    }
}
