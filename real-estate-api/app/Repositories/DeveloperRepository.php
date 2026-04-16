<?php

namespace App\Repositories;

use App\Models\Developer;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;

class DeveloperRepository extends BaseRepository
{
    protected Model $model;

    public function __construct(Developer $model)
    {
        parent::__construct($model);
    }

    public function getActivePaginated(int $perPage = 12): LengthAwarePaginator
    {
        return $this->model->active()->ordered()->paginate($perPage);
    }

    public function getWithProjectsCount(): Collection
    {
        return $this->model->active()
            ->withCount('projects')
            ->orderByDesc('projects_count')
            ->get();
    }

    public function getFeatured(int $limit = 6): Collection
    {
        return $this->model->active()
            ->withCount('projects')
            ->orderByDesc('projects_count')
            ->limit($limit)
            ->get();
    }

    public function search(string $search): Collection
    {
        return $this->model->active()
            ->where('name_en', 'LIKE', "%{$search}%")
            ->orWhere('name_ar', 'LIKE', "%{$search}%")
            ->ordered()
            ->get();
    }
}
