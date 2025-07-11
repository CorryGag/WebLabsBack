<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('subscriber_subscription', function (Blueprint $table) {
            $table->unsignedBigInteger("subscriber_id");
            $table->unsignedBigInteger("subscription_id");
            $table->foreign("subscriber_id")->references("id")->on("subscribers")->onDelete("cascade");
            $table->foreign("subscription_id")->references("id")->on("subscriptions")->onDelete("cascade");
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subscriber_subscription');
    }
};