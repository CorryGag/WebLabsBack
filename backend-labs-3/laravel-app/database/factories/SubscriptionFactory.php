<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Subscription>
 */
class SubscriptionFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'service' => $this->faker->word(),
            'topic' => $this->faker->word(),
            'payload' => json_encode(['data' => $this->faker->sentence()]),
            'expired_at' => $this->faker->dateTimeBetween('now', '+1 month')
        ];
    }
}