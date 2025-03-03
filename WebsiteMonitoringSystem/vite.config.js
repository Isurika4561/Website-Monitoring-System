import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';


export default defineConfig({

    /*plugins: [react()],
    server: {
        port: 3000,
    },*/

    plugins: [
        laravel({
            input: [
                'resources/sass/app.scss',
                'resources/js/app.js',
            ],
            refresh: true,
        }),

        
    ],
});
