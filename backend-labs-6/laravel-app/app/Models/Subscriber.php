<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subscriber extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'email'];
    public function subscriptions(){
        return $this->belongsToMany(Subscription::class, 'subscriber_subscription');
    }
}