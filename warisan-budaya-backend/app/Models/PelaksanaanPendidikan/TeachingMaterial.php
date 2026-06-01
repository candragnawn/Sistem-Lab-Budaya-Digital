<?php

namespace App\Models\PelaksanaanPendidikan;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Models\Lecturer;
class TeachingMaterial extends Model
{
    protected $table = "teaching_materials";

    protected $fillable = [
        'lecturer_id',
        'title',
        'isbn',
        'publication_date',
        'publisher',
    ];

    public function lecturer(): BelongsTo
    {
        return $this->belongsTo(Lecturer::class);

    }
}
