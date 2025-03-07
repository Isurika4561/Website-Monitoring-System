<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('monitoring_logs', function (Blueprint $table) {
            $table->id(); // Primary key
            $table->foreignId('website_id')->constrained('websites')->onDelete('cascade'); // Foreign key referencing the websites table
            $table->string('status'); // Website status (e.g., online, offline)
            $table->timestamp('checked_at')->useCurrent(); // Timestamp of when the status was checked
            $table->text('response')->nullable(); // Response from the website (optional)
            $table->timestamps(); // Timestamps for created_at and updated_at
        });
    }
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('monitoring_logs');
    }
};
