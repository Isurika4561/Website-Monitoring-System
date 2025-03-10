<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Log;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email|exists:users',
            'password' => 'required'

        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user || !Hash::check($request->password, $user->password)) {
            return [
                'message' => 'The provided credentials are incorrect!'
            ];
        }

        $token = $user->createToken($user->name);
        // $token = $user->createToken('auth_token')->plainTextToken;
        return [
            'user' => $user,
            'token' => $token->plainTextToken
        ];

    }
    public function register(Request $request)
{
    $request->validate([
        'name' => 'required|string|max:255', 
        'email' => 'required|email|unique:users,email', 
        'password' => 'required|confirmed|min:8', 
    ]);

    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password), 
    ]);

    return response()->json([
        'message' => 'Registration successful',
        'user' => $user,
    ], 201);
}

    public function logout(Request $request)
    {
        // Get the authenticated user
        $user = $request->user();

        // Revoke the user's current token
        $user->currentAccessToken()->delete();

        // Log the logout
        Log::info('User logged out', ['user_id' => $user->id, 'email' => $user->email]);

        return response()->json([
            'success' => true,
            'message' => 'Logout successful',
        ]);
    }
}