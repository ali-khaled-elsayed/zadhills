<?php

namespace App\Services;

use App\Repositories\LeadRepository;
use App\Models\Lead;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

class LeadService
{
    public function __construct(
        private LeadRepository $leadRepository,
    ) {}

    public function getAllPaginated(int $perPage = 15): LengthAwarePaginator
    {
        return $this->leadRepository->getPaginated($perPage);
    }

    public function create(array $data): Lead
    {
        return $this->leadRepository->create($data);
    }

    public function find(int $id): ?Lead
    {
        return $this->leadRepository->find($id);
    }

    public function update(int $id, array $data): Lead
    {
        return $this->leadRepository->update($id, $data);
    }

    public function delete(int $id): bool
    {
        return $this->leadRepository->delete($id);
    }

    public function getByStatus(string $status, int $perPage = 15): LengthAwarePaginator
    {
        return $this->leadRepository->getByStatus($status, $perPage);
    }

    public function getNewLeads(int $limit = 10): Collection
    {
        return $this->leadRepository->getNewLeads($limit);
    }

    public function getByUser(int $userId, int $perPage = 15): LengthAwarePaginator
    {
        return $this->leadRepository->getByUser($userId, $perPage);
    }

    public function getByProject(int $projectId, int $perPage = 15): LengthAwarePaginator
    {
        return $this->leadRepository->getByProject($projectId, $perPage);
    }

    public function getStatistics(): array
    {
        return $this->leadRepository->getStatistics();
    }

    public function getLeadsByMonth(int $months = 6): Collection
    {
        return $this->leadRepository->getLeadsByMonth($months);
    }

    public function getLeadsBySource(): Collection
    {
        return $this->leadRepository->getLeadsBySource();
    }

    public function getLeadsByBudgetRange(): Collection
    {
        return $this->leadRepository->getLeadsByBudgetRange();
    }
}
