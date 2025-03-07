<?php

namespace App\Http\Controllers;

use App\Models\Website;
use Illuminate\Http\Request;

class WebsiteController extends Controller
{
    // Fetch all websites
    public function index()
    {
        return Website::all();
    }

    // Fetch live status of websites
    public function getStatus()
    {
        $websites = Website::all();
        $status = [];

        foreach ($websites as $website) {
            // Assuming you have a method to check if the website is online or offline
            $status[$website->id] = $website->isOnline(); 
        }

        return response()->json($status);
    }

    // Fetch performance data
    public function getPerformanceData()
    {
        // Sample data; replace with actual performance data logic
        return response()->json([
            'responseTime' => 150,  // In milliseconds
            'errorCount' => 2,      // Example error count
        ]);
    }

    // Fetch error logs
    public function getErrorLogs()
    {
        // Example error logs; replace with your actual log fetching logic
        $logs = [
            'Error on website 1: Timeout',
            'Error on website 2: Server Down',
        ];

        return response()->json($logs);
    }
}
