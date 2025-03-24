<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Website;
use Illuminate\Support\Facades\Auth;

class WebsiteController extends Controller
{
    // ✅ Admin - Get all websites
    public function index(Request $request)
    {
        $user = $request->user();
        if ($user->role === 'admin') {
            return response()->json(Website::all(), 200);
        }
        return response()->json(['message' => 'Forbidden'], 403);
    }

    // ✅ Get websites created by a specific user
    public function userWebsites(Request $request, $userId)
    {
        $authUser = $request->user();
        if ($authUser->id != $userId && $authUser->role !== 'admin') {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $websites = Website::where('user_id', $userId)->get();
        return response()->json($websites, 200);
    }

    // ✅ Both Admin and User can add websites
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'url' => 'required|url',
            'user_id' => 'required|exists:users,id'
        ]);

        // Optional: Ensure user can only add under their user_id unless admin
        if ($request->user()->role !== 'admin' && $request->user()->id != $validated['user_id']) {
            return response()->json(['message' => 'Forbidden'], 403);
        }

        $website = Website::create([
            'name' => $validated['name'],
            'url' => $validated['url'],
            'user_id' => $validated['user_id'],
            'status' => 'up',  // Default status
        ]);

        return response()->json($website, 201);
    }
}
