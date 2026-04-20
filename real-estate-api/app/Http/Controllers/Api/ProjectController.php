<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\ProjectService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class ProjectController extends Controller
{
    public function __construct(
        private ProjectService $projectService,
    ) {}

    /**
     * Display a listing of projects.
     */
    public function index(Request $request): JsonResponse
    {
        $perPage = $request->get('per_page', 12);
        $projects = $this->projectService->getAllPaginated($perPage);

        return response()->json([
            'success' => true,
            'data' => $projects,
        ]);
    }

    /**
     * Display featured projects.
     */
    public function featured(): JsonResponse
    {
        $limit = request()->get('limit', 6);
        $projects = $this->projectService->getFeatured($limit);

        return response()->json([
            'success' => true,
            'data' => $projects,
        ]);
    }

    /**
     * Display latest projects.
     */
    public function latest(): JsonResponse
    {
        $limit = request()->get('limit', 6);
        $projects = $this->projectService->getLatest($limit);

        return response()->json([
            'success' => true,
            'data' => $projects,
        ]);
    }

    /**
     * Search projects with filters.
     */
    public function search(Request $request): JsonResponse
    {
        $filters = $request->only([
            'search',
            'city_id',
            'area_id',
            'developer_id',
            'project_type',
            'unit_type',
            'price_from',
            'price_to',
            'installment_years',
            'delivery_date',
            'bedrooms',
            'order_by',
            'order_direction',
        ]);

        $perPage = $request->get('per_page', 12);
        $projects = $this->projectService->search($filters, $perPage);

        return response()->json([
            'success' => true,
            'data' => $projects,
        ]);
    }

    /**
     * Display the specified project.
     */
    public function show(string $slug): JsonResponse
    {
        $project = $this->projectService->findBySlug($slug);

        if (!$project) {
            return response()->json([
                'success' => false,
                'message' => 'Project not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $project->load(['city', 'area', 'developer', 'images']),
        ]);
    }

    /**
     * Get similar projects.
     */
    public function similar(int $id): JsonResponse
    {
        $limit = request()->get('limit', 4);
        $projects = $this->projectService->getSimilar($id, $limit);

        return response()->json([
            'success' => true,
            'data' => $projects,
        ]);
    }

    /**
     * Get filter options.
     */
    public function filterOptions(): JsonResponse
    {
        $options = $this->projectService->getFilterOptions();

        return response()->json([
            'success' => true,
            'data' => $options,
        ]);
    }

    /**
     * Get projects for comparison.
     */
    public function compare(Request $request): JsonResponse
    {
        $projectIds = $request->input('ids', []);

        if (empty($projectIds)) {
            return response()->json([
                'success' => false,
                'message' => 'No project IDs provided',
            ], 400);
        }

        $projects = $this->projectService->getForComparison($projectIds);

        return response()->json([
            'success' => true,
            'data' => $projects,
        ]);
    }
}
