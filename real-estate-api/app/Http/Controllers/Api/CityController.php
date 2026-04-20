<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Repositories\CityRepository;
use Illuminate\Http\JsonResponse;

class CityController extends Controller
{
    public function __construct(
        private CityRepository $cityRepository,
    ) {}

    /**
     * Display a listing of cities.
     */
    public function index(): JsonResponse
    {
        $cities = $this->cityRepository->getWithProjectCount();

        return response()->json([
            'success' => true,
            'data' => $cities,
        ]);
    }

    /**
     * Display featured cities.
     */
    public function featured(): JsonResponse
    {
        $limit = request()->get('limit', 6);
        $cities = $this->cityRepository->getFeatured($limit);

        return response()->json([
            'success' => true,
            'data' => $cities,
        ]);
    }

    /**
     * Display the specified city with its projects.
     */
    public function show(string $slug): JsonResponse
    {
        $city = $this->cityRepository->findBySlug($slug);

        if (!$city) {
            return response()->json([
                'success' => false,
                'message' => 'City not found',
            ], 404);
        }

        $perPage = request()->get('per_page', 12);
        $projects = $city->projects()->active()
            ->with(['developer', 'images' => function ($q) {
                $q->ordered();
            }])
            ->orderByDesc('is_featured')
            ->paginate($perPage);

        return response()->json([
            'success' => true,
            'data' => [
                'city' => $city,
                'projects' => $projects,
            ],
        ]);
    }

    /**
     * Get areas for a specific city.
     */
    public function areas(int $cityId): JsonResponse
    {
        $areas = $this->cityRepository->getAreasByCity($cityId);

        return response()->json([
            'success' => true,
            'data' => $areas,
        ]);
    }
}
