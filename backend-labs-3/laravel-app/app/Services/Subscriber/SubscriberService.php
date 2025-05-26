<?php

namespace App\Services\Subscriber;

use LaravelEasyRepository\BaseService;

interface SubscriberService extends BaseService{

    public function findAll($limit, $page);
    public function findOne($id);
    public function create($data);
    public function update($id, $data);
    public function remove($id);
}