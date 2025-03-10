<?php

namespace App\Http\Controllers;

use App\Models\Website;
use Illuminate\Http\Request;

class WebsiteController extends Controller
{

    public function index()
    {
        $websites = Website::all();

        return response()->json([
            'websites' => $websites
        ]);
    }
    
    public function store(Request $request)
{
    $input = $request->validate([
        'url' => 'required|url',
        'name' => 'required|string|max:255', // Add a validation for 'name'
    ]);

    $user = $request->user();

    if (!$user) {
        return response()->json(['message' => 'Unauthenticated'], 401);
    }

    $input['user_id'] = $user->id;
    $input['status'] = 'unknown'; // Default value for status
    $input['last_checked_at'] = null; // Default value for last_checked_at

    $website = Website::create($input);

    return response()->json([
        'message' => 'Website created successfully',
        'website' => $website,
    ], 201);
}


}
