<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Route;

class RouteServiceProvider extends ServiceProvider
{
    /**
     * The path to the "home" route for your application.
     *
     * This is used by Laravel's authentication services to redirect users
     * after login.
     *
     * @var string
     */
    public const HOME = '/home'; // The default home route after login

    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        // Register any application services if needed
    }

    /**
     * Define your route model bindings, pattern filters, and other route services.
     *
     * @return void
     */
    public function boot()
    {
        $this->mapWebRoutes();
        $this->mapApiRoutes();
    }

    /**
     * Define the "web" routes for the application.
     *
     * @return void
     */
    protected function mapWebRoutes()
    {
        Route::middleware('web')
             ->group(base_path('routes/web.php'));
    }

    /**
     * Define the "api" routes for the application.
     *
     * @return void
     */
    protected function mapApiRoutes()
    {
        Route::middleware('api')
             ->prefix('api')
             ->group(base_path('routes/api.php'));
    }
}
