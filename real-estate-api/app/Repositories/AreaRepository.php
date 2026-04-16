<?php

namespace App\Repositories;

use App\Models\Area;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;

class AreaRepository extends BaseRepository
{
    protected Model $model;

    public function __construct(Area $model)
    {
        parent::__construct($model);
    }

    public function getActivePaginated(int $perPage = 15): LengthAwarePaginator
    {
        return $this->model->active()->ordered()->paginate($perPage);
    }

    public function getByCity(int $cityId): Collection
    {
        return $this->model->active()->byCity($cityId)->ordered()->get();
    }

    public function getWithProjectsCount(int $cityId = null): Collection
    {
        $query = $this->model->active()->withCount('projects');
        if ($cityId) {
            $query->byCity($cityId);
        }
        return $query->orderByDesc('projects_count')->get();
    }

    public function search(string $search, int $cityId = null): Collection
    {
        $query = $this->model->active()
            ->where('name_en', 'LIKE', "%{$search}%")
            ->orWhere('name_ar', 'LIKE', "%{$search}%");
        if ($cityId) {
            $query->byCity($cityId);
        }
        return $query->ordered()->get();
    }
}
