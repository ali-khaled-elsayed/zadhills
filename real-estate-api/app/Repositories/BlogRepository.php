<?php

namespace App\Repositories;

use App\Models\Blog;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;

class BlogRepository extends BaseRepository
{
    protected Model $model;

    public function __construct(Blog $model)
    {
        parent::__construct($model);
    }

    public function getPublishedPaginated(int $perPage = 12): LengthAwarePaginator
    {
        return $this->model->published()
            ->with('author')
            ->ordered()
            ->paginate($perPage);
    }

    public function getLatest(int $limit = 6): Collection
    {
        return $this->model->published()
            ->with('author')
            ->latest()
            ->limit($limit)
            ->get();
    }

    public function search(string $search, int $perPage = 12): LengthAwarePaginator
    {
        return $this->model->published()
            ->where(function ($query) use ($search) {
                $query->where('title_en', 'LIKE', "%{$search}%")
                    ->orWhere('title_ar', 'LIKE', "%{$search}%")
                    ->orWhere('content_en', 'LIKE', "%{$search}%")
                    ->orWhere('content_ar', 'LIKE', "%{$search}%");
            })
            ->latest()
            ->paginate($perPage);
    }

    public function getByTag(string $tag, int $perPage = 12): LengthAwarePaginator
    {
        return $this->model->published()
            ->whereJsonContains('tags', $tag)
            ->latest()
            ->paginate($perPage);
    }
}
