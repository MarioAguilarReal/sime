<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiAuthController;
use App\Http\Controllers\ApiController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


//Auth Routes------------------------------------------

//Public Routes
Route::post('/login', [ApiAuthController::class, 'login']);


//Students Routes
Route::prefix('students')->group(function () {
    Route::get('/all',[ApiStudentsController::class, 'all']);
});


//Private Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::get('/me', [ApiAuthController::class, 'me']);
    Route::post('/logout', [ApiAuthController::class, 'logout']);

    Route::prefix('/user')->group(function () {
        Route::get('/all', [ApiAuthController::class, 'all']);
        Route::post('/register', [ApiAuthController::class, 'register']);
        Route::patch('/update/{id}', [ApiAuthController::class, 'update']);
        Route::get('/{id}', [ApiAuthController::class, 'show']);
        Route::delete('/delete/{id}', [ApiAuthController::class, 'delete']);
    });
});



//Data Routes
