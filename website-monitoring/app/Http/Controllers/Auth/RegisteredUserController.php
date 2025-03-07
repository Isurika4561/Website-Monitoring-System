<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use App\Providers\RouteServiceProvider;
use Inertia\Inertia;

class RegisteredUserController extends Controller
{
    /**
     * Handle user registration via API (for React frontend).
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
   

public function create(Request $request)
{
    // Validate the incoming request data
    $validator = Validator::make($request->all(), [
        'name' => ['required', 'string', 'max:255'],
        'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
        'password' => ['required', 'string', 'min:8', 'confirmed'], // 'confirmed' expects 'password_confirmation'
    ]);

    if ($validator->fails()) {
        return Inertia::render('RegisterPage', [
            'errors' => $validator->errors()
        ]); // Return errors as Inertia response
    }

    // Create the user and hash the password
    $user = User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password), // Hash the password for security
    ]);

    // Optionally, log the user in after registration (if needed)
    Auth::login($user);

    // Return a successful Inertia response
    return Inertia::render('HomePage', [
        'message' => 'User registered successfully!'
    ]);
}

    /**
     * Handle user registration via Inertia (for full Laravel/React app).
     * This method handles redirects and Inertia responses for full-page rendering.
     */
    public function store(Request $request)
    {
        // Validate the incoming request
        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ]);

        // Create the user
        $user = User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'password' => Hash::make($validated['password']),
        ]);

        // Automatically assign the 'user' role to the newly registered user
        $user->assignRole('user'); // You can change 'user' to 'admin' or another role as needed

        // Log the user in after successful registration
        Auth::login($user);

        // Redirect to the home page or dashboard after registration
        return redirect(RouteServiceProvider::HOME);
    }
}
