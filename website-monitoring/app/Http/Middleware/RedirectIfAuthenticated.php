<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

class RedirectIfAuthenticated
{
    /**
     * Handle an incoming request.
     *
     * If the user is authenticated, they will be redirected to the intended page (default home).
     * Otherwise, they can continue with the requested route.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @return \Illuminate\Http\Response
     */
    public function handle(Request $request, Closure $next)
    {
        // Check if the user is authenticated
        if (Auth::check()) {
            // Redirect the authenticated user to the intended page (e.g., home or dashboard)
            return redirect()->route('home'); // Change 'home' to the route name you want to redirect to
        }

        // Continue with the request if not authenticated
        return $next($request);
    }
}