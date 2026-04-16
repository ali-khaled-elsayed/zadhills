<?php

namespace App\Repositories;

use App\Models\Lead;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;

class LeadRepository extends BaseRepository
{
    /**
     * @var Lead
     */
    protected Model $model;

    /**
     * LeadRepository constructor.
     *
     * @param Lead $model
     */
    public function __construct(Lead $model)
    {
        parent::__construct($model);
    }

    /**
     * Get paginated leads with relationships.
     *
     * @param int $perPage
     * @return LengthAwarePaginator
     */
    public function getPaginated(int $perPage = 15): LengthAwarePaginator
    {
        return $this->model
            ->with(['project', 'assignedTo'])
            ->latest()
            ->paginate($perPage);
    }

    /**
     * Get leads by status.
     *
     * @param string $status
     * @param int $perPage
     * @return LengthAwarePaginator
     */
    public function getByStatus(string $status, int $perPage = 15): LengthAwarePaginator
    {
        return $this->model
            ->with(['project', 'assignedTo'])
            ->byStatus($status)
            ->latest()
            ->paginate($perPage);
    }

    /**
     * Get new leads.
     *
     * @param int $limit
     * @return Collection
     */
    public function getNewLeads(int $limit = 10): Collection
    {
        return $this->model
            ->with(['project'])
            ->new()
            ->latest()
            ->limit($limit)
            ->get();
    }

    /**
     * Get leads assigned to a user.
     *
     * @param int $userId
     * @param int $perPage
     * @return LengthAwarePaginator
     */
    public function getByUser(int $userId, int $perPage = 15): LengthAwarePaginator
    {
        return $this->model
            ->with(['project'])
            ->where('assigned_to', $userId)
            ->latest()
            ->paginate($perPage);
    }

    /**
     * Get leads by project.
     *
     * @param int $projectId
     * @param int $perPage
     * @return LengthAwarePaginator
     */
    public function getByProject(int $projectId, int $perPage = 15): LengthAwarePaginator
    {
        return $this->model
            ->with(['assignedTo'])
            ->where('project_id', $projectId)
            ->latest()
            ->paginate($perPage);
    }

    /**
     * Get statistics for dashboard.
     *
     * @return array
     */
    public function getStatistics(): array
    {
        return [
            'total_leads' => $this->count(),
            'new_leads' => $this->model->new()->count(),
            'contacted_leads' => $this->model->byStatus('contacted')->count(),
            'qualified_leads' => $this->model->byStatus('qualified')->count(),
            'converted_leads' => $this->model->byStatus('converted')->count(),
            'leads_by_status' => $this->model->selectRaw('status, COUNT(*) as count')
                ->groupBy('status')
                ->get()
                ->pluck('count', 'status')
                ->toArray(),
            'leads_this_month' => $this->model->whereMonth('created_at', now()->month)
                ->whereYear('created_at', now()->year)
                ->count(),
            'leads_last_30_days' => $this->model->where('created_at', '>=', now()->subDays(30))->count(),
        ];
    }

    /**
     * Get leads grouped by month for chart.
     *
     * @param int $months
     * @return Collection
     */
    public function getLeadsByMonth(int $months = 6): Collection
    {
        return $this->model
            ->selectRaw('DATE_FORMAT(created_at, "%Y-%m") as month, COUNT(*) as count')
            ->where('created_at', '>=', now()->subMonths($months))
            ->groupBy('month')
            ->orderBy('month')
            ->get();
    }

    /**
     * Get leads grouped by source.
     *
     * @return Collection
     */
    public function getLeadsBySource(): Collection
    {
        return $this->model
            ->selectRaw('COALESCE(source, "direct") as source, COUNT(*) as count')
            ->groupBy('source')
            ->get();
    }

    /**
     * Get leads grouped by budget range.
     *
     * @return Collection
     */
    public function getLeadsByBudgetRange(): Collection
    {
        return $this->model
            ->selectRaw('COALESCE(budget_range, "not_specified") as budget_range, COUNT(*) as count')
            ->groupBy('budget_range')
            ->get();
    }
}
