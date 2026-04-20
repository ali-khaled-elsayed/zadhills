<?php

namespace App\Repositories;

use App\Models\City;
use App\Models\Area;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;

class CityRepository extends BaseRepository
{
    /**
     * @var City
     */
    protected Model $model;

    /**
     * CityRepository constructor.
     *
     * @param City $model
     */
    public function __construct(City $model)
    {
        parent::__construct($model);
    }

    /**
     * Get all active cities with their areas.
     *
     * @return Collection
     */
    public function getWithAreas(): Collection
    {
        return $this->model->with('areas')->active()->ordered()->get();
    }

    /**
     * Get paginated active cities.
     *
     * @param int $perPage
     * @return LengthAwarePaginator
     */
    public function getActivePaginated(int $perPage = 15): LengthAwarePaginator
    {
        return $this->model->active()->ordered()->paginate($perPage);
    }

    /**
     * Get cities with project count.
     *
     * @return Collection
     */
    public function getWithProjectCount(): Collection
    {
        return $this->model->active()
            ->withCount('projects')
            ->ordered()
            ->get();
    }

    /**
     * Search cities by name.
     *
     * @param string $search
     * @return Collection
     */
    public function search(string $search): Collection
    {
        return $this->model->active()
            ->where('name_en', 'LIKE', "%{$search}%")
            ->orWhere('name_ar', 'LIKE', "%{$search}%")
            ->ordered()
            ->get();
    }

    /**
     * Get featured cities (cities with most projects).
     *
     * @param int $limit
     * @return Collection
     */
    public function getFeatured(int $limit = 6): Collection
    {
        return $this->model->active()
            ->withCount('projects')
            ->orderByDesc('projects_count')
            ->limit($limit)
            ->get();
    }

    /**
     * Get areas for a specific city.
     *
     * @param int $cityId
     * @return Collection
     */
    public function getAreasByCity(int $cityId): Collection
    {
        return Area::where('city_id', $cityId)
            ->active()
            ->ordered()
            ->get();
    }
}
