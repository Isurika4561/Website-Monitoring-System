<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void {
        Schema::create('monitoring_logs', function (Blueprint $table) {
            $table->id();
            $table->foreignId('website_id')->constrained('websites')->onDelete('cascade');
            $table->enum('status', ['up', 'down']);
            $table->integer('response_time')->nullable(); // in milliseconds
            $table->timestamp('checked_at')->useCurrent();
            $table->timestamps();
        });
    }
    public function down(): void {
        Schema::dropIfExists('monitoring_logs');
    }
};
