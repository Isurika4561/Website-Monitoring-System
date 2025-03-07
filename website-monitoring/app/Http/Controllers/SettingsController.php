<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class SettingsController extends Controller
{
    // Get the settings for notifications and monitoring intervals
    public function getSettings()
    {
        // Assuming settings are stored in the 'settings' table or 'user' model
        $user = Auth::user();
        $settings = $user->settings; // Or your custom logic to fetch settings

        return response()->json($settings);
    }

    // Update settings for notifications and monitoring intervals
    public function updateSettings(Request $request)
    {
        // Validate incoming request
        $request->validate([
            'notifications.email' => 'boolean',
            'notifications.sms' => 'boolean',
            'notifications.dashboard_alerts' => 'boolean',
            'monitoring_interval' => 'integer|min:1',
        ]);

        // Update settings (You can save to database or to user model)
        $user = Auth::user();
        $user->settings()->update([
            'notifications' => $request->notifications,
            'monitoring_interval' => $request->monitoring_interval,
        ]);

        return response()->json(['message' => 'Settings updated successfully']);
    }
}
