<?php

namespace App\Repositories;

use App\Models\ContactMessage;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;

class ContactMessageRepository extends BaseRepository
{
    protected Model $model;

    public function __construct(ContactMessage $model)
    {
        parent::__construct($model);
    }

    public function getPaginated(int $perPage = 15): LengthAwarePaginator
    {
        return $this->model->with('assignedTo')->latest()->paginate($perPage);
    }

    public function getByStatus(string $status, int $perPage = 15): LengthAwarePaginator
    {
        return $this->model->byStatus($status)->latest()->paginate($perPage);
    }

    public function getUnreadCount(): int
    {
        return $this->model->unread()->count();
    }

    public function getStatistics(): array
    {
        return [
            'total_messages' => $this->count(),
            'unread_messages' => $this->getUnreadCount(),
            'read_messages' => $this->model->byStatus('read')->count(),
            'replied_messages' => $this->model->byStatus('replied')->count(),
            'messages_this_month' => $this->model->whereMonth('created_at', now()->month)
                ->whereYear('created_at', now()->year)
                ->count(),
        ];
    }
}
