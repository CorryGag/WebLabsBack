<?php

namespace App\Repositories\Subscription;

use LaravelEasyRepository\Repository;

interface SubscriptionRepository extends Repository{

    public function findAll();
    public function findOne($id);
    public function create($data);
    public function update($id, $data);
    public function remove($id);
}