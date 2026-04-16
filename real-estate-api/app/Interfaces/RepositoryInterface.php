<?php

namespace App\Interfaces;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;

interface RepositoryInterface
{
    /**
     * Get all records.
     *
     * @return Collection
     */
    public function all(): Collection;

    /**
     * Get paginated records.
     *
     * @param int $perPage
     * @return LengthAwarePaginator
     */
    public function paginate(int $perPage = 15): LengthAwarePaginator;

    /**
     * Find a record by ID.
     *
     * @param int $id
     * @return Model|null
     */
    public function find(int $id): ?Model;

    /**
     * Find a record by slug.
     *
     * @param string $slug
     * @return Model|null
     */
    public function findBySlug(string $slug): ?Model;

    /**
     * Find a record by a specific column.
     *
     * @param string $column
     * @param mixed $value
     * @return Model|null
     */
    public function findBy(string $column, mixed $value): ?Model;

    /**
     * Create a new record.
     *
     * @param array $data
     * @return Model
     */
    public function create(array $data): Model;

    /**
     * Update an existing record.
     *
     * @param int $id
     * @param array $data
     * @return Model
     */
    public function update(int $id, array $data): Model;

    /**
     * Delete a record.
     *
     * @param int $id
     * @return bool
     */
    public function delete(int $id): bool;

    /**
     * Get records by specific criteria.
     *
     * @param array $criteria
     * @return Collection
     */
    public function findByCriteria(array $criteria): Collection;

    /**
     * Get paginated records by specific criteria.
     *
     * @param array $criteria
     * @param int $perPage
     * @return LengthAwarePaginator
     */
    public function paginateByCriteria(array $criteria, int $perPage = 15): LengthAwarePaginator;

    /**
     * Count all records.
     *
     * @return int
     */
    public function count(): int;
}
