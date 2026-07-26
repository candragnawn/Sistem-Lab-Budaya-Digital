<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Models\Lecturer;
use App\Service\ImageConverter;
use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Support\Facades\Cache;
use Illuminate\Cache\TaggableStore;

class User extends Authenticatable implements MustVerifyEmail
{
    /** @use HasFactory<UserFactory> */
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'lecturer_id',
        'name',
        'email',
        'password',
        'avatar_path',
        'role',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    protected static function booted()
    {
        static::saving(function ($user) {
            if ($user->isDirty('avatar_path')) {
                //ganti avatar (delete) yang sebelumnya
                if ($user->avatar_path instanceof UploadedFile) {
                    if ($user->exists && $user->getOriginal('avatar_path')) {
                        Storage::disk('public')->delete($user->getOriginal('avatar_path'));
                    }
                    
                    // konversi ke webp
                    $user->avatar_path = ImageConverter::convertToWebp($user->avatar_path, 'avatars');
                } 
                elseif (is_null($user->avatar_path) && $user->exists && $user->getOriginal('avatar_path')) {
                    Storage::disk('public')->delete($user->getOriginal('avatar_path'));
                }
            }
        });

        static::saved(function ($user) {
            if ($user->isDirty('name') && $user->lecturer_id) {
                Lecturer::withoutEvents(function () use ($user) {
                    Lecturer::where('id', $user->lecturer_id)->update(['name' => $user->name]);
                });
            }
        });

        static::deleted(function ($user) {
            if ($user->avatar_path) {
                Storage::disk('public')->delete($user->avatar_path);
            }
            
            if ($user->lecturer_id) {
                $lecturer = Lecturer::find($user->lecturer_id);
                if ($lecturer) {
                    $lecturer->forceDelete(); 
                    try {
                        if (Cache::getStore() instanceof TaggableStore || method_exists(Cache::getStore(), 'tags')) {
                            Cache::tags(['lecturers'])->flush();
                        } else {
                            Cache::flush();
                        }
                    } catch (\Exception $e) {}
                }
            }
        });
    }

    public function lecturer()
    {
        return $this->belongsTo(Lecturer::class, 'lecturer_id');
    }

    protected function avatarUrl(): Attribute {
        return Attribute::make(
            get: fn () => $this->avatar_path
                ? Storage::url($this->avatar_path)
                : null
        );
    }


}

