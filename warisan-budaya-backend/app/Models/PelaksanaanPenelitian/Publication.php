<?php

namespace App\Models\PelaksanaanPenelitian;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use App\Models\Lecturer;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\SoftDeletes;

class Publication extends Model
{
    use SoftDeletes;

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

    protected static function booted()
    {
        static::saving (function ($user){
            if ($user->isDirty('url') && $user->url instanceof UploadedFile) { 
                    // generate uuid
                    $file = $user->url;
                    $filename = Str::uuid() . '.' . $file->extension();
                    $user->url = $file->storeAs('publications', $filename, 'public');
                } 
                elseif (is_null($user->url) && $user->exists && $user->getOriginal('url')) {
                    // Hanya hapus jika URL aslinya adalah path file lokal (bukan link web)
                    if (!str_starts_with($user->getOriginal('url'), 'http')) {
                        Storage::disk('public')->delete($user->getOriginal('url'));
                    }
                }
            });
        static::deleted(function ($user) {
            if ($user->url) {
                Storage::disk('public')->delete($user->url);
            }
        });

    }

}
