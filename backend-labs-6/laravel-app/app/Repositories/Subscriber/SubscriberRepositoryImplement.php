<?php

namespace App\Repositories\Subscriber;

use LaravelEasyRepository\Implementations\Eloquent;
use App\Models\Subscriber;

class SubscriberRepositoryImplement extends Eloquent implements SubscriberRepository{

    /**
    * Model class to be used in this repository for the common methods inside Eloquent
    * Don't remove or change $this->model variable name
    * @property Model|mixed $model;
    */
    protected $model;

    public function __construct(Subscriber $model)
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
        $subscriber = $this->model->findOrFail($id);
        $subscriber->update($data);
        return $subscriber;
    }

    public function remove($id){
        return $this->model->findOrFail($id)->delete();
    }
}
