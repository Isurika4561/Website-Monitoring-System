<?php

use App\Http\Controllers\AuthController; 
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\WebsiteController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\SettingsController;

// Route to get and update settings
Route::get('/settings', [SettingsController::class, 'getSettings']);
Route::post('/settings', [SettingsController::class, 'updateSettings']);


Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::get('websites', [WebsiteController::class, 'index']);
Route::post('websites', [WebsiteController::class, 'store']);
Route::delete('websites/{id}', [WebsiteController::class, 'destroy']);


Route::put('websites/{id}/status', [WebsiteController::class, 'updateStatus']);
Route::post('/register', [RegisteredUserController::class, 'create']);

Route::get('/websites', [WebsiteController::class, 'index']);
Route::get('/websites/status', [WebsiteController::class, 'getStatus']);
Route::get('/websites/performance', [WebsiteController::class, 'getPerformanceData']);
Route::get('/websites/error-logs', [WebsiteController::class, 'getErrorLogs']);

