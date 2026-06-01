<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Database\Factories\UserFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use App\Models\Lecturer;

class User extends Authenticatable
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
                //ganti avatar delete yang sebelumnya
                if ($user->avatar_path instanceof UploadedFile) {
                    if ($user->exists && $user->getOriginal('avatar_path')) {
                        Storage::disk('public')->delete($user->getOriginal('avatar_path'));
                    }
                    
                    // genearate uuid
                    $file = $user->avatar_path;
                    $filename = Str::uuid() . '.' . $file->extension();
                    $user->avatar_path = $file->storeAs('avatars', $filename, 'public');
                } 
                elseif (is_null($user->avatar_path) && $user->exists && $user->getOriginal('avatar_path')) {
                    Storage::disk('public')->delete($user->getOriginal('avatar_path'));
                }
            }
        });
        static::deleted(function ($user) {
            if ($user->avatar_path) {
                Storage::disk('public')->delete($user->avatar_path);
            }
        });

    }

    public function lecturer()
    {
        return $this->belongsTo(Lecturer::class, 'lecturer_id');
    }


}

