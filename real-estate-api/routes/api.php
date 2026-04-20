<?php

use App\Http\Controllers\Api\AreaController;
use App\Http\Controllers\Api\BlogController;
use App\Http\Controllers\Api\CityController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\DeveloperController;
use App\Http\Controllers\Api\LeadController;
use App\Http\Controllers\Api\PageContentController;
use App\Http\Controllers\Api\PartnerController;
use App\Http\Controllers\Api\ProjectController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group.
|
*/

// Public routes
Route::prefix('v1')->group(function () {
    // Projects
    Route::get('/projects', [ProjectController::class, 'index']);
    Route::get('/projects/featured', [ProjectController::class, 'featured']);
    Route::get('/projects/latest', [ProjectController::class, 'latest']);
    Route::get('/projects/search', [ProjectController::class, 'search']);
    Route::get('/projects/filter-options', [ProjectController::class, 'filterOptions']);
    Route::post('/projects/compare', [ProjectController::class, 'compare']);
    Route::get('/projects/{slug}', [ProjectController::class, 'show']);
    Route::get('/projects/{id}/similar', [ProjectController::class, 'similar']);

    // Cities
    Route::get('/cities', [CityController::class, 'index']);
    Route::get('/cities/featured', [CityController::class, 'featured']);
    Route::get('/cities/{slug}', [CityController::class, 'show']);
    Route::get('/cities/{cityId}/areas', [CityController::class, 'areas']);

    // Areas
    Route::get('/areas', [AreaController::class, 'index']);

    // Developers
    Route::get('/developers', [DeveloperController::class, 'index']);
    Route::get('/developers/featured', [DeveloperController::class, 'featured']);
    Route::get('/developers/{slug}', [DeveloperController::class, 'show']);

    // Blogs
    Route::get('/blogs', [BlogController::class, 'index']);
    Route::get('/blogs/latest', [BlogController::class, 'latest']);
    Route::get('/blogs/search', [BlogController::class, 'search']);
    Route::get('/blogs/tag/{tag}', [BlogController::class, 'byTag']);
    Route::get('/blogs/{slug}', [BlogController::class, 'show']);

    // Partners
    Route::get('/partners', [PartnerController::class, 'index']);
    Route::get('/partners/{slug}', [PartnerController::class, 'show']);

    // Contact
    Route::post('/contact', [ContactController::class, 'store']);
});

// Protected routes (require authentication)
Route::middleware('auth:sanctum')->prefix('v1')->group(function () {
    // Partners CRUD
    Route::apiResource('partners', PartnerController::class)->except(['index', 'show']);

    // User profile
    Route::get('/user', function (\Illuminate\Http\Request $request) {
        return response()->json([
            'success' => true,
            'data' => $request->user(),
        ]);
    });
});
