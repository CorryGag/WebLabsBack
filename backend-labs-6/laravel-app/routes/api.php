<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SubscriberController;
use App\Http\Controllers\SubscriptionController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware(['auth:api'])->group(function () {
    Route::get('/subscribers', [SubscriberController::class, 'index'])->middleware('role:laravel-client,Viewer');
    Route::get('/subscribers/{id}', [SubscriberController::class, 'show'])->middleware('role:laravel-client,Viewer');
    Route::post('/subscribers', [SubscriberController::class, 'store'])->middleware('role:laravel-client,Writer');
    Route::match(['put', 'patch'], '/subscribers/{id}', [SubscriberController::class, 'update'])->middleware('role:laravel-client,Writer');
    Route::delete('/subscribers/{id}', [SubscriberController::class, 'destroy'])->middleware('role:laravel-client,Writer');
});

Route::middleware(['auth:api'])->group(function () {
    Route::get('/subscriptions', [SubscriptionController::class, 'index'])->middleware('role:laravel-client,Viewer');
    Route::get('/subscriptions/{id}', [SubscriptionController::class, 'show'])->middleware('role:laravel-client,Viewer');
    Route::post('/subscriptions', [SubscriptionController::class, 'store'])->middleware('role:laravel-client,Writer');
    Route::match(['put', 'patch'], '/subscriptions/{id}', [SubscriptionController::class, 'update'])->middleware('role:laravel-client,Writer');
    Route::delete('/subscriptions/{id}', [SubscriptionController::class, 'destroy'])->middleware('role:laravel-client,Writer');
});