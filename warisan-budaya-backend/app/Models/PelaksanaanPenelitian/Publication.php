<?php

namespace App\Models\PelaksanaanPenelitian;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Lecturer;
use App\Models\PelaksanaanPenelitian\PublicationAuthor;

class Publication extends Model
{
    protected $table = "publications";

    protected $fillable = [
        'lecturer_id','publication_author_id', 'title', 'category', 'type' ,'source', 'quartile', 'document_url', 'is_verified', 'year', 'url'
    ];
    public function lecturer(): BelongsTo{
            return $this->belongsTo(Lecturer::class);
        }

    public function publication_authors(): BelongsTo {
        return $this->belongsTo(PublicationAuthor::class);
    }
}
