<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\MonitoringLogsController;
use App\Http\Controllers\WebsiteController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;


// Handle CORS preflight (OPTIONS) requests
Route::options('/{any}', function () {
    return response('', 200)
        ->header('Access-Control-Allow-Origin', 'http://localhost:5173') // Allow your frontend URL
        ->header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
        ->header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
})->where('any', '.*');

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// User Registration
Route::post('/register', [AuthController::class, 'register']);

// User Login
Route::post('/login', [AuthController::class, 'login']);

Route::get('/sanctum/csrf-cookie', function () {
    return response()->noContent();
});



Route::middleware('api')->post('/login', [AuthController::class, 'login']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/websites', [WebsiteController::class, 'store']);
    Route::get('/websites', [WebsiteController::class, 'index']);
    Route::get('/monitoring-logs', [MonitoringLogsController::class, 'index']);
    Route::get('/monitoring-logs-data/{website_id}', [MonitoringLogsController::class, 'show']);
    Route::get('/website-stats', [WebsiteController::class, 'getWebsiteStats']);

});

