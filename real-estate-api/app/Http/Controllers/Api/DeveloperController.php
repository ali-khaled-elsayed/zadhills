<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Repositories\DeveloperRepository;
use Illuminate\Http\JsonResponse;

class DeveloperController extends Controller
{
    public function __construct(
        private DeveloperRepository $developerRepository,
    ) {}

    /**
     * Display a listing of developers.
     */
    public function index(): JsonResponse
    {
        $perPage = request()->get('per_page', 12);
        $developers = $this->developerRepository->getActivePaginated($perPage);

        return response()->json([
            'success' => true,
            'data' => $developers,
        ]);
    }

    /**
     * Display featured developers.
     */
    public function featured(): JsonResponse
    {
        $limit = request()->get('limit', 6);
        $developers = $this->developerRepository->getFeatured($limit);

        return response()->json([
            'success' => true,
            'data' => $developers,
        ]);
    }

    /**
     * Display the specified developer with their projects.
     */
    public function show(string $slug): JsonResponse
    {
        $developer = $this->developerRepository->findBySlug($slug);

        if (!$developer) {
            return response()->json([
                'success' => false,
                'message' => 'Developer not found',
            ], 404);
        }

        $perPage = request()->get('per_page', 12);
        $projects = $developer->projects()->active()
            ->with(['city', 'area', 'images' => function ($q) {
                $q->ordered();
            }])
            ->orderByDesc('is_featured')
            ->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => [
                'developer' => $developer,
                'projects' => $projects,
            ],
        ]);
    }
}
