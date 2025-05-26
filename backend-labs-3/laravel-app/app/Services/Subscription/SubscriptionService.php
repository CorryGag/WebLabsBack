<?php

namespace App\Services\Subscription;

use LaravelEasyRepository\BaseService;

interface SubscriptionService extends BaseService{

    public function findAll($limit, $page);
    public function findOne($id);
    public function create($data);
    public function update($id, $data);
    public function remove($id);
}