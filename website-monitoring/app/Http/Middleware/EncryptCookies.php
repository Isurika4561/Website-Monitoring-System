<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cookie;

class EncryptCookies
{
    /**
     * The names of the cookies that should not be encrypted.
     *
     * @var array
     */
    protected $except = [
        // Add cookie names that should not be encrypted here
    ];

    /**
     * Encrypt the cookies that are being sent with the request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        // Encrypt cookies
        $response = $next($request);
        
        // Encrypt cookies before sending the response
        if (method_exists($response, 'cookie')) {
            foreach ($response->headers->getCookies() as $cookie) {
                Cookie::queue($cookie->name, $cookie->getValue(), $cookie->getExpiresTime());
            }
        }
        
        return $response;
    }
}
