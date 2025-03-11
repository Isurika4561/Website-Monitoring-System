<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Website extends Model
{
    protected $table = 'websites';
    protected $primaryKey = 'id';

    protected $fillable = [
        'user_id',
        'name', 
        'url', 
        'status', 
        'last_checked_at'
    ];
    public function user(){
        return $this->belongsTo(User::class);
    }

    /*public function monitoringLogs(){
        return $this->hasMany(MonitoringLog::class);
    }
        */
}
