<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Repositories\BlogRepository;
use Illuminate\Http\JsonResponse;

class BlogController extends Controller
{
    public function __construct(
        private BlogRepository $blogRepository,
    ) {}

    /**
     * Display a listing of blogs.
     */
    public function index(): JsonResponse
    {
        $perPage = request()->get('per_page', 12);
        $blogs = $this->blogRepository->getPublishedPaginated($perPage);

        return response()->json([
            'success' => true,
            'data' => $blogs,
        ]);
    }

    /**
     * Display latest blogs.
     */
    public function latest(): JsonResponse
    {
        $limit = request()->get('limit', 6);
        $blogs = $this->blogRepository->getLatest($limit);

        return response()->json([
            'success' => true,
            'data' => $blogs,
        ]);
    }

    /**
     * Search blogs.
     */
    public function search(): JsonResponse
    {
        $search = request()->get('search', '');
        $perPage = request()->get('per_page', 12);

        if ($search) {
            $blogs = $this->blogRepository->search($search, $perPage);
        } else {
            $blogs = $this->blogRepository->getPublishedPaginated($perPage);
        }

        return response()->json([
            'success' => true,
            'data' => $blogs,
        ]);
    }

    /**
     * Display the specified blog.
     */
    public function show(string $slug): JsonResponse
    {
        $blog = $this->blogRepository->findBySlug($slug);

        if (!$blog) {
            return response()->json([
                'success' => false,
                'message' => 'Blog not found',
            ], 404);
        }

        // Increment views
        $blog->incrementViewsCount();

        return response()->json([
            'success' => true,
            'data' => $blog->load('author'),
        ]);
    }

    /**
     * Get blogs by tag.
     */
    public function byTag(string $tag): JsonResponse
    {
        $perPage = request()->get('per_page', 12);
        $blogs = $this->blogRepository->getByTag($tag, $perPage);

        return response()->json([
            'success' => true,
            'data' => $blogs,
        ]);
    }
}
