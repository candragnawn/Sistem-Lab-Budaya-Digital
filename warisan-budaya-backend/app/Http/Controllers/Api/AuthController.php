<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Http\Resources\Master\UserResource;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;
use App\Http\Requests\Auth\RegisterAuthRequest;
use App\Http\Requests\Auth\LoginAuthRequest;
use App\Models\Lecturer;
class AuthController extends Controller
{
    public function register(RegisterAuthRequest $request)
    {
        $lecturer  = Lecturer::create([
            "name"=> $request->name,
            "email"=> $request->email,

        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'lecturer_id' => $lecturer->id,
        ]);

        $token = $user->createToken('auth_token')->plainTextToken;

       return new UserResource($user, $token);
    }

    public function login(LoginAuthRequest $request)
    {
        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => 'Invalid login credentials.'
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
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logged out successfully'
        ]);
    }
}
