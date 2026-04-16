<?php

namespace App\Services;

use App\Repositories\ProjectRepository;
use App\Repositories\CityRepository;
use App\Repositories\AreaRepository;
use App\Repositories\DeveloperRepository;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class ProjectService
{
    public function __construct(
        private ProjectRepository $projectRepository,
        private CityRepository $cityRepository,
        private AreaRepository $areaRepository,
        private DeveloperRepository $developerRepository,
    ) {}

    public function getAllPaginated(int $perPage = 12): LengthAwarePaginator
    {
        return $this->projectRepository->getActivePaginated($perPage);
    }

    public function getFeatured(int $limit = 6): Collection
    {
        return $this->projectRepository->getFeatured($limit);
    }

    public function getLatest(int $limit = 6): Collection
    {
        return $this->projectRepository->getLatest($limit);
    }

    public function find(int $id): ?\App\Models\Project
    {
        return $this->projectRepository->find($id);
    }

    public function findBySlug(string $slug): ?\App\Models\Project
    {
        $project = $this->projectRepository->findBySlug($slug);
        if ($project) {
            $project->incrementViewsCount();
        }
        return $project;
    }

    public function search(array $filters, int $perPage = 12): LengthAwarePaginator
    {
        return $this->projectRepository->search($filters, $perPage);
    }

    public function getByCity(int $cityId, int $perPage = 12): LengthAwarePaginator
    {
        return $this->projectRepository->getByCity($cityId, $perPage);
    }

    public function getByArea(int $areaId, int $perPage = 12): LengthAwarePaginator
    {
        return $this->projectRepository->getByArea($areaId, $perPage);
    }

    public function getByDeveloper(int $developerId, int $perPage = 12): LengthAwarePaginator
    {
        return $this->projectRepository->getByDeveloper($developerId, $perPage);
    }

    public function getSimilar(int $projectId, int $limit = 4): Collection
    {
        return $this->projectRepository->getSimilar($projectId, $limit);
    }

    public function getForComparison(array $projectIds): Collection
    {
        return $this->projectRepository->getForComparison($projectIds);
    }

    public function getStatistics(): array
    {
        return $this->projectRepository->getStatistics();
    }

    public function getFilterOptions(): array
    {
        return [
            'cities' => $this->cityRepository->getWithAreas(),
            'developers' => $this->developerRepository->getActivePaginated(50),
            'project_types' => ['residential', 'commercial', 'administrative', 'mixed', 'compound'],
            'unit_types' => ['apartment', 'villa', 'townhouse', 'twin_house', 'penthouse', 'studio', 'office', 'shop', 'warehouse'],
        ];
    }
}
