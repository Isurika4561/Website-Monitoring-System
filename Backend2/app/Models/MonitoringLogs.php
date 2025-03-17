<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class MonitoringLog extends Model
{
    use HasFactory;

    protected $table = 'monitoring_logs';
    protected $primaryKey = 'id';

    protected $fillable = ['website_id', 'status', 'response_time', 'checked_at'];

    public function website(){
        return $this->belongsTo(Website::class);
    }
}
