<?php

namespace App\Services\Subscription;

use LaravelEasyRepository\Service;
use App\Repositories\Subscription\SubscriptionRepository;

class SubscriptionServiceImplement extends Service implements SubscriptionService{

     /**
     * don't change $this->mainRepository variable name
     * because used in extends service class
     */
     protected $mainRepository;

    public function __construct(SubscriptionRepository $subscriptionRepository)
    {
      $this->mainRepository = $subscriptionRepository;
    }

    public function findAll($limit, $page){
      return $this->mainRepository->findAll()->paginate($limit, ['*'], 'page', $page);
    }

    public function findOne($id){
      return $this->mainRepository->findOne($id);
    }

    public function create($data){
      return $this->mainRepository->create($data);
    }

    public function update($id, $data){
      return $this->mainRepository->update($id, $data);
    }

    public function remove($id){
      return $this->mainRepository->remove($id);
    }
}