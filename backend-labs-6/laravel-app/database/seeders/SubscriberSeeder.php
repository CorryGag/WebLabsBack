<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Subscriber;
use App\Models\Subscription;

class SubscriberSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $subscriptions = Subscription::all();

        Subscriber::factory()
            ->count(100)
            ->create()
            ->each(function ($subscriber) use ($subscriptions) {
                $randomSubscriptions = $subscriptions->random(3);
                $subscriber->subscriptions()->attach($randomSubscriptions->pluck('id'));
            });
    }
}