<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        // Validate the login credentials
        $request->validate([
            'email' => 'required|email',
            'password' => 'required|min:6',
        ]);

        // Attempt to authenticate the user
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            return response()->json(['success' => true, 'message' => 'Login successful']);
        } else {
            return response()->json(['success' => false, 'message' => 'Invalid credentials'], 401);
        }
    }

    public function register(Request $request)
    {
        // Validate the incoming request
        $request->validate([
            'email' => 'required|email|unique:users,email',
            'password' => 'required|confirmed|min:8',
        ]);

        // Create a new user
        $user = User::create([
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        // Respond with a success message
        return response()->json(['success' => true, 'message' => 'Registration successful']);
    }
}
