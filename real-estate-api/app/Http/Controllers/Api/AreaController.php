<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Repositories\AreaRepository;
use Illuminate\Http\JsonResponse;

class AreaController extends Controller
{
    public function __construct(
        private AreaRepository $areaRepository,
    ) {}

    /**
     * Display a listing of areas.
     */
    public function index(): JsonResponse
    {
        $areas = $this->areaRepository->getActivePaginated(1000);

        return response()->json([
            'success' => true,
            'data' => $areas,
        ]);
    }
}
