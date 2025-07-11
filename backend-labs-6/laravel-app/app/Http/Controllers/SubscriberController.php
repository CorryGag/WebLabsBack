<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Requests\StoreSubscriberRequest;
use App\Http\Requests\UpdateSubscriberRequest;
use App\Http\Resources\SubscriberResource;
use App\Services\Subscriber\SubscriberService;

class SubscriberController extends Controller
{

    public function __construct(private SubscriberService $subscriberService){}

    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $limit = $request->query('limit', 10);
        $page = $request->query('page', 1);
        
        return SubscriberResource::collection($this->subscriberService->findAll($limit, $page));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreSubscriberRequest $request)
    {
        return SubscriberResource::make($this->subscriberService->create($request->validated()));
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        return SubscriberResource::make($this->subscriberService->findOne($id));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateSubscriberRequest $request, int $id)
    {
        return SubscriberResource::make($this->subscriberService->update($id, $request->validated()));
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        return $this->subscriberService->delete($id);
    }
}