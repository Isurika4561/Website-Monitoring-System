<?php

return [
    /*
    |--------------------------------------------------------------------------
    | Laravel CORS Configuration
    |--------------------------------------------------------------------------
    |
    | This file is for configuring CORS settings for your application.
    | You may freely add, remove, or edit the allowed origins, methods,
    | and headers to match your requirements.
    |
    */

    'paths' => ['api/*', 'sanctum/csrf-cookie'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:5176/'], 
    'allowed_headers' => ['*'],
    'supports_credentials' => true,
];
