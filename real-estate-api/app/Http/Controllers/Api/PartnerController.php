<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Partner;
use App\Repositories\PartnerRepository;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class PartnerController extends Controller
{
    public function __construct(
        private PartnerRepository $partnerRepository,
    ) {}

    /**
     * Display a listing of partners.
     */
    public function index(): JsonResponse
    {
        $partners = $this->partnerRepository->getActive();

        return response()->json([
            'success' => true,
            'data' => $partners,
        ]);
    }

    /**
     * Store a newly created partner.
     */
    public function store(Request $request): JsonResponse
    {
        $validator = Validator::make($request->all(), [
            'name_en' => 'required|string|max:255',
            'name_ar' => 'required|string|max:255',
            'logo' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $partner = $this->partnerRepository->create($request->all());

        return response()->json([
            'success' => true,
            'data' => $partner,
            'message' => 'Partner created successfully',
        ], 201);
    }

    /**
     * Display the specified partner.
     */
    public function show(string $slug): JsonResponse
    {
        $partner = $this->partnerRepository->findBySlug($slug);

        if (!$partner) {
            return response()->json([
                'success' => false,
                'message' => 'Partner not found',
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $partner,
        ]);
    }

    /**
     * Update the specified partner.
     */
    public function update(Request $request, string $id): JsonResponse
    {
        $partner = $this->partnerRepository->find($id);

        if (!$partner) {
            return response()->json([
                'success' => false,
                'message' => 'Partner not found',
            ], 404);
        }

        $validator = Validator::make($request->all(), [
            'name_en' => 'required|string|max:255',
            'name_ar' => 'required|string|max:255',
            'logo' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors' => $validator->errors(),
            ], 422);
        }

        $partner = $this->partnerRepository->update($id, $request->all());

        return response()->json([
            'success' => true,
            'data' => $partner,
            'message' => 'Partner updated successfully',
        ]);
    }

    /**
     * Remove the specified partner.
     */
    public function destroy(string $id): JsonResponse
    {
        $partner = $this->partnerRepository->find($id);

        if (!$partner) {
            return response()->json([
                'success' => false,
                'message' => 'Partner not found',
            ], 404);
        }

        $this->partnerRepository->delete($id);

        return response()->json([
            'success' => true,
            'message' => 'Partner deleted successfully',
        ]);
    }
}
