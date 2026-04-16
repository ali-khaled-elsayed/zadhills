<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Services\LeadService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class LeadController extends Controller
{
    public function __construct(
        private LeadService $leadService,
    ) {}

    /**
     * Store a new lead.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'email' => 'nullable|email|max:255',
            'project_id' => 'nullable|exists:projects,id',
            'preferred_location' => 'nullable|string|max:255',
            'budget_range' => 'nullable|in:under_1m,1m_3m,3m_5m,5m_10m,over_10m',
            'notes' => 'nullable|string',
            'source' => 'nullable|string|max:255',
        ]);

        $lead = $this->leadService->create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Lead created successfully',
            'data' => $lead,
        ], 201);
    }
}
