<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\LecturerController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\DigitalAssetController;
use App\Http\Controllers\Api\PublicationController;
use App\Http\Controllers\Api\ResearchController;
use App\Http\Controllers\Api\CommunityServiceController;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::apiResource('lecturers', LecturerController::class);
    Route::apiResource('categories', CategoryController::class);
    Route::apiResource('digital-assets', DigitalAssetController::class);
    Route::apiResource('publications', PublicationController::class);
    Route::apiResource('research', ResearchController::class);
    Route::apiResource('community-services', CommunityServiceController::class);
});

Route::get('/public/lecturers', [LecturerController::class, 'index']);
Route::get('/public/lecturers/{id}', [LecturerController::class, 'show']);
