<?php

use App\Jobs\CheckMyAllWebsites;
use Illuminate\Support\Facades\Schedule;
use Illuminate\Foundation\Console\ClosureCommand;
use Illuminate\Foundation\Inspiring;
use Illuminate\Support\Facades\Artisan;
//use Illuminate\Console\Scheduling\Schedule as SchedulingSchedule;
use App\Models\Website;
use Illuminate\Support\Facades\Http;


Artisan::command('inspire', function () {
    /** @var ClosureCommand $this */
    $this->comment(Inspiring::quote());
})->purpose('Display an inspiring quote');

Schedule::job(new CheckMyAllWebsites)
    ->everyFiveMinutes()
    ->name('check_all_websites')
    ->withoutOverlapping();

