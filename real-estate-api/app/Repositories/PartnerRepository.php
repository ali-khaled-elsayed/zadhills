<?php

namespace App\Repositories;

use App\Models\Partner;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class PartnerRepository extends BaseRepository
{
    /**
     * @var Partner
     */
    protected Model $model;

    /**
     * PartnerRepository constructor.
     *
     * @param Partner $model
     */
    public function __construct(Partner $model)
    {
        parent::__construct($model);
    }

    /**
     * Get all partners.
     *
     * @return Collection
     */
    public function getActive(): Collection
    {
        return $this->model->all();
    }

    /**
     * Get partners with pagination.
     *
     * @param int $perPage
     * @return \Illuminate\Contracts\Pagination\LengthAwarePaginator
     */
    public function getPaginated(int $perPage = 15)
    {
        return $this->model->paginate($perPage);
    }
}
