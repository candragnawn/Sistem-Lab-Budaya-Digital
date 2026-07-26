<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Resources\Master\UserResource;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;
use App\Http\Requests\Auth\RegisterAuthRequest;
use App\Http\Requests\Auth\LoginAuthRequest;
use App\Models\Lecturer;
use App\service\SyncCoordinator;
use App\Jobs\SyncLecturerData;
use Illuminate\Support\Facades\Cache;
use Illuminate\Cache\TaggableStore;
use Illuminate\Auth\Events\Registered;

class AuthController extends Controller
{
    public function register(RegisterAuthRequest $request)
    {
        // Bungkus dalam transaction kalau User gagal, Lecturer ikut di-rollback
        $result = DB::transaction(function () use ($request) {
            $lecturer = null;
            
            // Jika role dosen (default), kita buat record lecturer
            $role = $request->role ?? 'dosen';
            
            if ($role === 'dosen') {
                $lecturer = Lecturer::create([
                    'name'        => $request->name,
                    'email'       => $request->email,
                    'nidn'        => $request->nidn,
                    'is_verified' => true,
                ]);
            }

            $user = User::create([
                'name'        => $request->name,
                'email'       => $request->email,
                'password'    => Hash::make($request->password),
                'lecturer_id' => $lecturer ? $lecturer->id : null,
                'role'        => $role,
            ]);

            return [$user, $lecturer, $user->createToken('auth_token')->plainTextToken];
        });

        [$user, $lecturer, $token] = $result;

        // Bersihkan cache agar data pengguna dan dosen yang baru dibuat langsung muncul di daftar
        try {
            if (Cache::getStore() instanceof TaggableStore || method_exists(Cache::getStore(), 'tags')) {
                Cache::tags(['users', 'lecturers'])->flush();
            } else {
                Cache::flush();
            }
        } catch (\Exception $e) {
            Cache::flush();
        }

        // Kirim email verifikasi
        event(new Registered($user));

        // Auto-Sync SISTER, SINTA, Scopus secara Asynchronous (Latar Belakang)
        if ($request->nidn) {
            SyncLecturerData::dispatch($lecturer);
        }

        return new UserResource($user, $token);
    }

    public function login(LoginAuthRequest $request)
    {
        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'status'  => 'error',
                'message' => 'Kombinasi email dan password salah.'
            ], 401);
        }

        // Cek apakah email sudah diverifikasi (kecuali Super Admin mungkin tidak perlu, tapi kita asumsikan semua harus diverifikasi)
        // Kita juga bisa memberikan bypass untuk Super Admin jika email belum verifikasi, namun lebih baik semuanya diverifikasi.
        if (!$user->hasVerifiedEmail()) {
            return response()->json([
                'status'  => 'error',
                'message' => 'Akun belum diverifikasi. Silakan cek kotak masuk email Anda untuk melakukan verifikasi.'
            ], 403);
        }

        return new UserResource($user, $user->createToken('auth_token')->plainTextToken);
    }

    public function me(Request $request)
    {
        return new UserResource($request->user());
    }

    public function uploadAvatar(Request $request)
    {
        $request->validate([
            'avatar' => 'required|image|mimes:jpg,jpeg,png,webp|max:5120',
        ]);

        $user = $request->user();
        
        $user->avatar_path = $request->file('avatar');
        $user->save();

        if ($user->lecturer_id) {
            $lecturer = Lecturer::find($user->lecturer_id);
            if ($lecturer) {
                $lecturer->photo_path = $user->avatar_path;
                $lecturer->save();
            }
        }

        return response()->json([
            'success' => true,
            'message' => 'Foto profil berhasil diperbarui.',
            'data'    => new UserResource($user),
        ]);
    }

    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Logged out successfully',
        ]);
    }
}
