<?php

namespace App\Repositories;

use App\Interfaces\RepositoryInterface;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;

class BaseRepository implements RepositoryInterface
{
    /**
     * @var Model
     */
    protected Model $model;

    /**
     * BaseRepository constructor.
     *
     * @param Model $model
     */
    public function __construct(Model $model)
    {
        $this->model = $model;
    }

    /**
     * {@inheritDoc}
     */
    public function all(): Collection
    {
        return $this->model->get();
    }

    /**
     * {@inheritDoc}
     */
    public function paginate(int $perPage = 15): LengthAwarePaginator
    {
        return $this->model->paginate($perPage);
    }

    /**
     * {@inheritDoc}
     */
    public function find(int $id): ?Model
    {
        return $this->model->find($id);
    }

    /**
     * {@inheritDoc}
     */
    public function findBySlug(string $slug): ?Model
    {
        return $this->model->where('slug', $slug)->first();
    }

    /**
     * {@inheritDoc}
     */
    public function findBy(string $column, mixed $value): ?Model
    {
        return $this->model->where($column, $value)->first();
    }

    /**
     * {@inheritDoc}
     */
    public function create(array $data): Model
    {
        return $this->model->create($data);
    }

    /**
     * {@inheritDoc}
     */
    public function update(int $id, array $data): Model
    {
        $record = $this->find($id);

        if (!$record) {
            throw new \Exception("Record not found with ID: {$id}");
        }

        $record->update($data);
        return $record->fresh();
    }

    /**
     * {@inheritDoc}
     */
    public function delete(int $id): bool
    {
        $record = $this->find($id);

        if (!$record) {
            return false;
        }

        return $record->delete();
    }

    /**
     * {@inheritDoc}
     */
    public function findByCriteria(array $criteria): Collection
    {
        $query = $this->model->newQuery();

        foreach ($criteria as $column => $value) {
            if (is_array($value)) {
                $query->whereIn($column, $value);
            } else {
                $query->where($column, $value);
            }
        }

        return $query->get();
    }

    /**
     * {@inheritDoc}
     */
    public function paginateByCriteria(array $criteria, int $perPage = 15): LengthAwarePaginator
    {
        $query = $this->model->newQuery();

        foreach ($criteria as $column => $value) {
            if (is_array($value)) {
                $query->whereIn($column, $value);
            } else {
                $query->where($column, $value);
            }
        }

        return $query->paginate($perPage);
    }

    /**
     * {@inheritDoc}
     */
    public function count(): int
    {
        return $this->model->count();
    }

    /**
     * Get the model instance.
     *
     * @return Model
     */
    public function getModel(): Model
    {
        return $this->model;
    }

    /**
     * Get a new query builder instance.
     *
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function query()
    {
        return $this->model->newQuery();
    }

    /**
     * Find records by multiple columns.
     *
     * @param array $where
     * @return Collection
     */
    public function findWhere(array $where): Collection
    {
        $query = $this->model->newQuery();

        foreach ($where as $column => $value) {
            $query->where($column, $value);
        }

        return $query->get();
    }

    /**
     * Find records by multiple columns with pagination.
     *
     * @param array $where
     * @param int $perPage
     * @return LengthAwarePaginator
     */
    public function findWherePaginated(array $where, int $perPage = 15): LengthAwarePaginator
    {
        $query = $this->model->newQuery();

        foreach ($where as $column => $value) {
            $query->where($column, $value);
        }

        return $query->paginate($perPage);
    }

    /**
     * Get first record by criteria.
     *
     * @param array $criteria
     * @return Model|null
     */
    public function firstByCriteria(array $criteria): ?Model
    {
        $query = $this->model->newQuery();

        foreach ($criteria as $column => $value) {
            $query->where($column, $value);
        }

        return $query->first();
    }

    /**
     * Update or create a record.
     *
     * @param array $attributes
     * @param array $values
     * @return Model
     */
    public function updateOrCreate(array $attributes, array $values = []): Model
    {
        return $this->model->updateOrCreate($attributes, $values);
    }

    /**
     * Get records with relationships.
     *
     * @param array $relations
     * @return Collection
     */
    public function with(array $relations): Collection
    {
        return $this->model->with($relations)->get();
    }

    /**
     * Get paginated records with relationships.
     *
     * @param array $relations
     * @param int $perPage
     * @return LengthAwarePaginator
     */
    public function withPaginated(array $relations, int $perPage = 15): LengthAwarePaginator
    {
        return $this->model->with($relations)->paginate($perPage);
    }

    /**
     * Get records with specific columns.
     *
     * @param array $columns
     * @return Collection
     */
    public function getWithColumns(array $columns = ['*']): Collection
    {
        return $this->model->get($columns);
    }

    /**
     * Order records by column.
     *
     * @param string $column
     * @param string $direction
     * @return $this
     */
    public function orderBy(string $column, string $direction = 'asc'): self
    {
        $this->model = $this->model->orderBy($column, $direction);
        return $this;
    }

    /**
     * Limit the number of records.
     *
     * @param int $limit
     * @return Collection
     */
    public function limit(int $limit): Collection
    {
        return $this->model->limit($limit)->get();
    }

    /**
     * Execute a callback within a database transaction.
     *
     * @param \Closure $callback
     * @return mixed
     */
    public function transaction(\Closure $callback): mixed
    {
        return DB::transaction($callback);
    }
}
