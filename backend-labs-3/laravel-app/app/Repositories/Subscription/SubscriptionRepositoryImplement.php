<?php

namespace App\Repositories\Subscription;

use LaravelEasyRepository\Implementations\Eloquent;
use App\Models\Subscription;

class SubscriptionRepositoryImplement extends Eloquent implements SubscriptionRepository{

    /**
    * Model class to be used in this repository for the common methods inside Eloquent
    * Don't remove or change $this->model variable name
    * @property Model|mixed $model;
    */
    protected $model;

    public function __construct(Subscription $model)
    {
        $this->model = $model;
    }

    public function findAll(){
        return $this->model->orderBy('id', 'asc');
    }

    public function findOne($id){
        return $this->model->findOrFail($id);
    }

    public function create($data){
        return $this->model->create($data);
    }

    public function update($id, $data){
        $subscription = $this->model->findOrFail($id);
        $subscription->update($data);
        return $subscription;
    }

    public function remove($id){
        return $this->model->findOrFail($id)->delete();
    }
}