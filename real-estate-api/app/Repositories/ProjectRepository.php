<?php

namespace App\Repositories;

use App\Models\Project;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;

class ProjectRepository extends BaseRepository
{
    /**
     * @var Project
     */
    protected Model $model;

    /**
     * ProjectRepository constructor.
     *
     * @param Project $model
     */
    public function __construct(Project $model)
    {
        parent::__construct($model);
    }

    /**
     * Get paginated active projects with relationships.
     *
     * @param int $perPage
     * @return LengthAwarePaginator
     */
    public function getActivePaginated(int $perPage = 12): LengthAwarePaginator
    {
        return $this->model
            ->with(['city', 'area', 'developer', 'images' => function ($q) {
                $q->ordered();
            }])
            ->active()
            ->orderByDesc('is_featured')
            ->orderByDesc('created_at')
            ->paginate($perPage);
    }

    /**
     * Get featured projects.
     *
     * @param int $limit
     * @return Collection
     */
    public function getFeatured(int $limit = 6): Collection
    {
        return $this->model
            ->with(['city', 'area', 'developer', 'images' => function ($q) {
                $q->ordered()->limit(1);
            }])
            ->active()
            ->featured()
            ->orderByDesc('created_at')
            ->limit($limit)
            ->get();
    }

    /**
     * Get latest projects.
     *
     * @param int $limit
     * @return Collection
     */
    public function getLatest(int $limit = 6): Collection
    {
        return $this->model
            ->with(['city', 'area', 'developer', 'images' => function ($q) {
                $q->ordered()->limit(1);
            }])
            ->active()
            ->orderByDesc('created_at')
            ->limit($limit)
            ->get();
    }

    /**
     * Search projects with filters.
     *
     * @param array $filters
     * @param int $perPage
     * @return LengthAwarePaginator
     */
    public function search(array $filters, int $perPage = 12): LengthAwarePaginator
    {
        $query = $this->model->with(['city', 'area', 'developer', 'images' => function ($q) {
            $q->ordered();
        }])->active();

        // Filter by city
        if (isset($filters['city_id'])) {
            $query->where('city_id', $filters['city_id']);
        }

        // Filter by area
        if (isset($filters['area_id'])) {
            $query->where('area_id', $filters['area_id']);
        }

        // Filter by developer
        if (isset($filters['developer_id'])) {
            $query->where('developer_id', $filters['developer_id']);
        }

        // Filter by project type
        if (isset($filters['project_type'])) {
            $query->where('project_type', $filters['project_type']);
        }

        // Filter by unit type
        if (isset($filters['unit_type'])) {
            $query->where('unit_type', $filters['unit_type']);
        }

        // Filter by price range
        if (isset($filters['price_from'])) {
            $query->where('price_from', '>=', $filters['price_from']);
        }
        if (isset($filters['price_to'])) {
            $query->where('price_to', '<=', $filters['price_to']);
        }

        // Filter by installment years
        if (isset($filters['installment_years'])) {
            $query->where('installment_years', $filters['installment_years']);
        }

        // Filter by delivery date
        if (isset($filters['delivery_date'])) {
            $query->whereDate('delivery_date', '>=', $filters['delivery_date']);
        }

        // Filter by bedrooms
        if (isset($filters['bedrooms'])) {
            $query->where('bedrooms', '>=', $filters['bedrooms']);
        }

        // Search by title
        if (isset($filters['search'])) {
            $search = $filters['search'];
            $query->where(function ($q) use ($search) {
                $q->where('title_en', 'LIKE', "%{$search}%")
                    ->orWhere('title_ar', 'LIKE', "%{$search}%");
            });
        }

        // Order by
        $orderBy = $filters['order_by'] ?? 'created_at';
        $direction = $filters['order_direction'] ?? 'desc';
        $query->orderBy($orderBy, $direction);

        return $query->paginate($perPage);
    }

    /**
     * Get projects by city.
     *
     * @param int $cityId
     * @param int $perPage
     * @return LengthAwarePaginator
     */
    public function getByCity(int $cityId, int $perPage = 12): LengthAwarePaginator
    {
        return $this->model
            ->with(['city', 'area', 'developer', 'images' => function ($q) {
                $q->ordered();
            }])
            ->active()
            ->byCity($cityId)
            ->orderByDesc('is_featured')
            ->orderByDesc('created_at')
            ->paginate($perPage);
    }

    /**
     * Get projects by area.
     *
     * @param int $areaId
     * @param int $perPage
     * @return LengthAwarePaginator
     */
    public function getByArea(int $areaId, int $perPage = 12): LengthAwarePaginator
    {
        return $this->model
            ->with(['city', 'area', 'developer', 'images' => function ($q) {
                $q->ordered();
            }])
            ->active()
            ->byArea($areaId)
            ->orderByDesc('is_featured')
            ->orderByDesc('created_at')
            ->paginate($perPage);
    }

    /**
     * Get projects by developer.
     *
     * @param int $developerId
     * @param int $perPage
     * @return LengthAwarePaginator
     */
    public function getByDeveloper(int $developerId, int $perPage = 12): LengthAwarePaginator
    {
        return $this->model
            ->with(['city', 'area', 'developer', 'images' => function ($q) {
                $q->ordered();
            }])
            ->active()
            ->byDeveloper($developerId)
            ->orderByDesc('created_at')
            ->paginate($perPage);
    }

    /**
     * Get similar projects.
     *
     * @param int $projectId
     * @param int $limit
     * @return Collection
     */
    public function getSimilar(int $projectId, int $limit = 4): Collection
    {
        $project = $this->find($projectId);

        if (!$project) {
            return collect();
        }

        return $this->model
            ->with(['city', 'area', 'developer', 'images' => function ($q) {
                $q->ordered()->limit(1);
            }])
            ->active()
            ->where('id', '!=', $projectId)
            ->where('city_id', $project->city_id)
            ->where('project_type', $project->project_type)
            ->orderByDesc('is_featured')
            ->orderByDesc('created_at')
            ->limit($limit)
            ->get();
    }

    /**
     * Get projects for comparison.
     *
     * @param array $projectIds
     * @return Collection
     */
    public function getForComparison(array $projectIds): Collection
    {
        return $this->model
            ->with(['city', 'area', 'developer', 'images' => function ($q) {
                $q->ordered()->limit(1);
            }])
            ->active()
            ->whereIn('id', $projectIds)
            ->get();
    }

    /**
     * Get statistics for dashboard.
     *
     * @return array
     */
    public function getStatistics(): array
    {
        return [
            'total_projects' => $this->count(),
            'active_projects' => $this->model->active()->count(),
            'featured_projects' => $this->model->featured()->count(),
            'projects_by_type' => $this->model->selectRaw('project_type, COUNT(*) as count')
                ->groupBy('project_type')
                ->get()
                ->pluck('count', 'project_type')
                ->toArray(),
            'projects_by_city' => $this->model->selectRaw('city_id, COUNT(*) as count')
                ->groupBy('city_id')
                ->with('city:name_en')
                ->get()
                ->map(function ($item) {
                    return [
                        'city' => $item->city->name_en ?? 'Unknown',
                        'count' => $item->count,
                    ];
                }),
        ];
    }
}
