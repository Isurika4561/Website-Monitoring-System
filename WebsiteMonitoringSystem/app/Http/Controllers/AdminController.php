<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\User; // Import the correct User model
use Illuminate\Support\Facades\Hash; // Import the Hash facade

class AdminController extends Controller
{
    public function index()
    {
        return view('admin.dashboard');
    }

    public function login(Request $request)
        {
            $user = User::where('email', $request->email)->first();

            if (!$user || !Hash::check($request->password, $user->password)) {
                return response()->json(['message' => 'Invalid credentials'], 401);
            }

            // Make sure $user is an instance of the User model
            $token = $user->createToken('authToken')->plainTextToken;

            return response()->json([
                'user' => $user,
                'token' => $token
            ]);
        }
}
