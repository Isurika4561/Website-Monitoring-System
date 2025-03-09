<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\Auth\RegisteredUserController;
use App\Http\Controllers\AuthController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::get('/dashboard', [DashboardController::class, 'index']);
    Route::get('/admin/dashboard', [AdminController::class, 'index']);
    Route::resource('websites', AdminController::class);
});

Route::middleware('role:admin')->group(function () {
    Route::get('/admin/dashboard', [AdminController::class, 'index']);
    Route::get('/admin/manage-users', [AdminController::class, 'manageUsers']);
});

Route::middleware('guest')->group(function () {
    // These routes will be accessible only to guests (unauthenticated users)
    Route::get('/login', [LoginController::class, 'showLoginForm']);
    //Route::get('/register', [RegisterController::class, 'showRegistrationForm']);
});

//Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [RegisteredUserController::class, 'store']);


require __DIR__.'/auth.php';
