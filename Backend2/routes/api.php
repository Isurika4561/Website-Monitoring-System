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

// Authentication routes
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::get('/sanctum/csrf-cookie', function () {
    return response()->noContent();
});

Route::get('/website-stats', function() {
    return response()->json([
        'monitored' => \App\Models\Website::count(),
        'active' => \App\Models\Website::where('status', 'up')->count(),
        'down' => \App\Models\Website::where('status', 'down')->count(),
    ]);
})->middleware('auth:sanctum');


Route::middleware('api')->post('/login', [AuthController::class, 'login']);

/*Route::middleware(['auth:sanctum', 'role:admin'])->group(function () {
    Route::get('/websites', [WebsiteController::class, 'index']);
    //Route::post('/websites', [WebsiteController::class, 'store']);
    Route::get('/monitoring-logs', [MonitoringLogsController::class, 'index']);
    Route::get('/monitoring-logs-data/{website_id}', [MonitoringLogsController::class, 'show']);
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/websites', [WebsiteController::class, 'store']);
    Route::get('/websites', [WebsiteController::class, 'index']);
    Route::get('/user/{user}/websites', [WebsiteController::class, 'userWebsites']);
});
*/

Route::middleware('auth:sanctum')->group(function () {

    // ✅ Admin - Get all websites
    Route::get('/websites', [WebsiteController::class, 'index']); // Returns all if admin

    // ✅ Regular User - Get their own websites
    Route::get('/user/{user}/websites', [WebsiteController::class, 'userWebsites']);

    // ✅ Both Admin and User can add websites
    Route::post('/websites', [WebsiteController::class, 'store']);

    // ✅ Logout
    Route::post('/logout', [AuthController::class, 'logout']);

    // ✅ (Optional) Admin User Management
    Route::get('/admin/users', [AuthController::class, 'listUsers']);
    Route::delete('/admin/users/{id}', [AuthController::class, 'deleteUser']);
    Route::put('/admin/users/{id}', [AuthController::class, 'updateUser']);

    
});
