<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Lecturer;
class PublicationAuthor extends Model
{
    protected $table = 'publication_authors';
    protected $fillable = [
        'lecturer_id',
        'publication_id',
        'author_position',
    ];

    public function lecturer(): BelongsTo  {
        return $this->belongsTo(Lecturer::class);

    }
}
