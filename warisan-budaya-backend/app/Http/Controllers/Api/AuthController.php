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

class AuthController extends Controller
{
    public function register(RegisterAuthRequest $request)
    {
        $lecturer = Lecturer::create([
            "name" => $request->name,
            "email" => $request->email,
            "nidn" => $request->nidn,
        ]);
        // Bungkus dalam transaction — kalau User gagal, Lecturer ikut di-rollback
        $result = DB::transaction(function () use ($request) {
            $lecturer = Lecturer::create([
                'name'  => $request->name,
                'email' => $request->email,
            ]);

            $user = User::create([
                'name'        => $request->name,
                'email'       => $request->email,
                'password'    => Hash::make($request->password),
                'lecturer_id' => $lecturer->id,
            ]);

            return [$user, $user->createToken('auth_token')->plainTextToken];
        });

        [$user, $token] = $result;

        // Auto-Sync SISTER dengan Graceful Error Handling
        if ($request->nidn) {
            try {
                app(SyncCoordinator::class)->syncAll($lecturer);
            } catch (\Exception $e) {
                \Illuminate\Support\Facades\Log::error("[AuthController] Gagal auto-sync saat registrasi untuk NIDN {$request->nidn}: " . $e->getMessage());
            }
        }

       return new UserResource($user, $token);
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

    public function logout(Request $request)
    {
        // Revoke SEMUA token user (bukan hanya current token)
        $request->user()->tokens()->delete();

        return response()->json([
            'success' => true,
            'message' => 'Logged out successfully',
        ]);
    }
}
