<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Default Broadcast Driver
    |--------------------------------------------------------------------------
    |
    | This option controls the default broadcast connection that will be used.
    | You may set this to any of the connections listed below. By default,
    | Laravel supports "pusher" and "redis" but you are free to add others.
    |
    */

    'default' => env('BROADCAST_DRIVER', 'pusher'),

    /*
    |--------------------------------------------------------------------------
    | Broadcast Connections
    |--------------------------------------------------------------------------
    |
    | Here you may define all of the broadcast connections that your application
    | will use. Laravel supports several broadcast drivers such as Pusher, Redis,
    | and even a log driver for local debugging. You can define your connections
    | here and set options for each broadcast connection.
    |
    */

    'connections' => [

        'pusher' => [
            'driver' => 'pusher',
            'key' => env('5a46eb6c37e8613db768'),
            'secret' => env('d5fbe0cbe8bb48e6b833'),
            'app_id' => env('1953083'),
            'options' => [
                'cluster' => env('ap2'),
                'encrypted' => true,
            ],
        ],

        'redis' => [
            'driver' => 'redis',
            'connection' => 'default',
        ],

        'log' => [
            'driver' => 'log',
        ],

        'null' => [
            'driver' => 'null',
        ],

    ],

];
