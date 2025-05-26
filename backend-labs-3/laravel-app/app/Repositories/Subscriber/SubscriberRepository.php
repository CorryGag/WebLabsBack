<?php

namespace App\Repositories\Subscriber;

use LaravelEasyRepository\Repository;

interface SubscriberRepository extends Repository{

    public function findAll();
    public function findOne($id);
    public function create($data);
    public function update($id, $data);
    public function remove($id);

}