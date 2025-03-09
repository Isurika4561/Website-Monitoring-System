<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MonitoringLog extends Model
{
    use HasFactory;

    protected $table = 'monitoring_logs';

    protected $fillable = [
        'website_id', 'status', 'response_time', 'timestamp'  // Adjust fields
    ];
}
