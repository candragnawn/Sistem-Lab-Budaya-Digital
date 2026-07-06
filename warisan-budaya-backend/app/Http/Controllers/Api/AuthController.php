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

class AuthController extends Controller
{
    public function register(RegisterAuthRequest $request)
    {
        // Bungkus dalam transaction kalau User gagal, Lecturer ikut di-rollback
        $result = DB::transaction(function () use ($request) {
            $lecturer = Lecturer::create([
                'name'  => $request->name,
                'email' => $request->email,
                'nidn'  => $request->nidn,
            ]);

            $user = User::create([
                'name'        => $request->name,
                'email'       => $request->email,
                'password'    => Hash::make($request->password),
                'lecturer_id' => $lecturer->id,
            ]);

            return [$user, $lecturer, $user->createToken('auth_token')->plainTextToken];
        });

        [$user, $lecturer, $token] = $result;

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
                'success' => false,
                'message' => 'Email atau password salah.',
            ], 401);
        }

        $token = $user->createToken('auth_token')->plainTextToken;

        return new UserResource($user, $token);
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
        
        if ($request->hasFile('avatar')) {
            $path = $request->file('avatar')->store('avatars', 'public');
            $user->avatar_path = $path;
            $user->save();

            if ($user->lecturer_id) {
                $lecturer = Lecturer::find($user->lecturer_id);
                if ($lecturer) {
                    $lecturer->photo_path = $path;
                    $lecturer->save();
                }
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
