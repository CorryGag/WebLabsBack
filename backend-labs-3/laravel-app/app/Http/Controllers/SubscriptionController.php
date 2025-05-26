<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreSubscriptionRequest;
use App\Http\Requests\UpdateSubscriptionRequest;
use App\Http\Resources\SubscriptionResource;
use App\Services\Subscription\SubscriptionService;

class SubscriptionController extends Controller
{

    public function __construct(private SubscriptionService $subscriptionService){}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $limit = $request->query('limit', 10);
        $page = $request->query('page', 1);
        
        return SubscriptionResource::collection($this->subscriptionService->findAll($limit, $page));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSubscriptionRequest $request)
    {
        return SubscriptionResource::make($this->subscriptionService->create($request->validated()));
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        return SubscriptionResource::make($this->subscriptionService->findOne($id));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSubscriptionRequest $request, int $id)
    {
        return SubscriptionResource::make($this->subscriptionService->update($id, $request->validated()));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        return $this->subscriptionService->delete($id);
    }
}