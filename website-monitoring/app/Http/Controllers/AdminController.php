<?php

namespace App\Http\Controllers;

use App\Models\Website;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    public function index()
    {
        // Get all websites
        $websites = Website::all();
        return view('admin.dashboard', compact('websites'));
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'url' => 'required|url|unique:websites,url',
            'status' => 'required|in:active,inactive',
        ]);

        Website::create($validated);
        return redirect()->route('admin.dashboard');
    }

    public function destroy($id)
    {
        $website = Website::findOrFail($id);
        $website->delete();
        return redirect()->route('admin.dashboard');
    }
}
