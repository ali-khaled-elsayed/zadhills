<?php

namespace App\Services;

use App\Repositories\ContactMessageRepository;
use App\Models\ContactMessage;
use Illuminate\Pagination\LengthAwarePaginator;

class ContactService
{
    public function __construct(
        private ContactMessageRepository $contactMessageRepository,
    ) {}

    public function getAllPaginated(int $perPage = 15): LengthAwarePaginator
    {
        return $this->contactMessageRepository->getPaginated($perPage);
    }

    public function create(array $data): ContactMessage
    {
        return $this->contactMessageRepository->create($data);
    }

    public function find(int $id): ?ContactMessage
    {
        return $this->contactMessageRepository->find($id);
    }

    public function update(int $id, array $data): ContactMessage
    {
        return $this->contactMessageRepository->update($id, $data);
    }

    public function delete(int $id): bool
    {
        return $this->contactMessageRepository->delete($id);
    }

    public function markAsRead(int $id): bool
    {
        $message = $this->find($id);
        if ($message) {
            $message->markAsRead();
            return true;
        }
        return false;
    }

    public function markAsReplied(int $id, string $response): bool
    {
        $message = $this->find($id);
        if ($message) {
            $message->markAsReplied($response);
            return true;
        }
        return false;
    }

    public function getUnreadCount(): int
    {
        return $this->contactMessageRepository->getUnreadCount();
    }

    public function getStatistics(): array
    {
        return $this->contactMessageRepository->getStatistics();
    }
}
