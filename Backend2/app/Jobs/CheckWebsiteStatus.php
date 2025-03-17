<?php

namespace App\Jobs;

use App\Models\MonitoringLog;
use App\Models\Website;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Http;

class CheckWebsiteStatus implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    protected Website $website;

    public function __construct(Website $website)
    {
        $this->website = $website;
    }

    public function handle()
    {
        $startTime = microtime(true);

        try {
            $response = Http::timeout(10)->get($this->website->url);
            $endTime = microtime(true);
            $responseTime = round(($endTime - $startTime) * 1000); // milliseconds

            // Set status based on HTTP response success
            $status = $response->successful() ? 'up' : 'down';
        } catch (\Exception $e) {
            // If there's an error (e.g., timeout or connection error)
            $status = 'down';
            $responseTime = null;
        }

        // Update website table with new status and last checked timestamp
        $this->website->update([
            'status' => $status,
            'last_checked_at' => now(),
        ]);

        // Create a monitoring log entry
        MonitoringLog::create([
            'website_id' => $this->website->id,
            'status' => $status,
            'response_time' => $responseTime,
            'checked_at' => now(),
        ]);
    }
}
