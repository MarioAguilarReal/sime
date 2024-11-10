<?php

use App\Http\Controllers\ClasseController;
use App\Http\Controllers\GroupController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ApiAuthController;
use App\Http\Controllers\ApiController;
use App\Http\Controllers\ApiStudentsController;
use App\Http\Controllers\EmailController;
use App\Http\Controllers\ApiStudentsAcademicDataController;
use App\Http\Controllers\ApiSpecialNeedsController;
use App\Http\Controllers\ApiPlanningSkillsController;
use App\Http\Controllers\ApiSocialSkillsController;
use App\Http\Controllers\ApiCognitiveSkillsController;
use App\Http\Controllers\ApiAlternativeSkillsController;
use App\Http\Controllers\ApiCommentsController;
use App\Http\Controllers\ApiLearningTypeController;

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

//Configure ENV Frontend URL
Route::get('/env', function () {
    return response()->json([
        'FRONTEND_URL' => env('FRONTEND_URL'),
    ]);
});


//Auth Routes------------------------------------------

//Public Routes
Route::post('/login', [ApiAuthController::class, 'login']);
Route::post('reset-password', [ApiAuthController::class, 'resetPassword']);

// TODO : Add the following routes to the Auth Routes
Route::get('/user/classes/{id}', [ClasseController::class, 'classes_by_user']);
Route::get('/user/groups/{id}', [GroupController::class, 'groups_by_user']);

//Email Routes
Route::prefix('email')->group(function () {
    Route::post('/forget-password', [EmailController::class, 'sendEmailToForgetPassword']);
    // Route::post('/verify/{id}', [EmailController::class, 'verify']);
});

//check validate token
route::prefix('token')->group(function () {
    Route::post( '/verify-forget-password', [ApiAuthController::class, 'verifyTokenToChangePassword']);
});



//Private Routes
Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [ApiAuthController::class, 'logout']);
    Route::get('/me', [ApiAuthController::class, 'me']);

    Route::post('/change-password', [ApiAuthController::class, 'changePassword']);


    Route::prefix('/user')->group(function () {
        Route::get('/all', [ApiAuthController::class, 'all']);
        Route::post('/register', [ApiAuthController::class, 'register']);
        Route::post('/edit/{id}', [ApiAuthController::class, 'edit']);
        Route::get('/{id}', [ApiAuthController::class, 'show']);
        Route::delete('/delete/{id}', [ApiAuthController::class, 'delete']);
    });

    //Students Routes
    Route::prefix('/students')->group(function () {
        Route::get('/all',[ApiStudentsController::class, 'all']);
        Route::post('/register',[ApiStudentsController::class, 'register']);
        Route::get('/{id}',[ApiStudentsController::class, 'show']);
        Route::post('/update/{id}',[ApiStudentsController::class, 'update']);
        Route::delete('/delete/{id}',[ApiStudentsController::class, 'delete']);

        Route::post('/set-learning-type/{id}', [ApiLearningTypeController::class, 'setLearningType']);
        Route::post('/update-learning-type/{id}', [ApiLearningTypeController::class, 'updateLearningType']);

        Route::prefix('academic-data')->group(function () {
            Route::post('/register/{id}',[ApiStudentsAcademicDataController::class, 'register']);
            Route::get('/all',[ApiStudentsAcademicDataController::class, 'showAll']);
            Route::get('/{id}',[ApiStudentsAcademicDataController::class, 'show']);
            Route::post('/update/{id}',[ApiStudentsAcademicDataController::class, 'update']);
        });

        Route::prefix('cognitive-skills')->group(function () {
            Route::post('/register/{id}',[ApiCognitiveSkillsController::class, 'register']);
            Route::get('/{id}',[ApiCognitiveSkillsController::class, 'show']);
            Route::post('/update/{id}',[ApiCognitiveSkillsController::class, 'update']);
        });

        Route::prefix('special-needs')->group(function () {
            Route::post('/register/{id}',[ApiSpecialNeedsController::class, 'register']);
            Route::get('/{id}',[ApiSpecialNeedsController::class, 'show']);
            Route::post('/update/{id}',[ApiSpecialNeedsController::class, 'update']);
        });

        Route::prefix('planning-skills')->group(function () {
            Route::post('/register/{id}',[ApiPlanningSkillsController::class, 'register']);
            Route::get('/{id}',[ApiPlanningSkillsController::class, 'show']);
            Route::post('/update/{id}',[ApiPlanningSkillsController::class, 'update']);
        });

        Route::prefix('social-skills')->group(function () {
            Route::post('/register/{id}',[ApiSocialSkillsController::class, 'register']);
            Route::get('/{id}',[ApiSocialSkillsController::class, 'show']);
            Route::post('/update/{id}',[ApiSocialSkillsController::class, 'update']);
        });

        Route::prefix('alternative-skills')->group(function () {
            Route::post('/register/{id}',[ApiAlternativeSkillsController::class, 'register']);
            Route::get('/{id}',[ApiAlternativeSkillsController::class, 'show']);
            Route::post('/update/{id}',[ApiAlternativeSkillsController::class, 'update']);
        });

        Route::prefix('comments')->group(function () {
            Route::post('/register/{id}',[ApiCommentsController::class, 'register']);
            Route::get('/{id}',[ApiCommentsController::class, 'show']);
            Route::post('/update/{id}',[ApiCommentsController::class, 'update']);
        });

    });

    Route::prefix('/group')->group(function () {
        Route::get('/all', [GroupController::class, 'all']);
        Route::post('/register', [GroupController::class, 'register']);
        Route::post('/edit/{id}', [GroupController::class, 'edit']);
        Route::get('/{id}', [GroupController::class, 'show']);
        Route::delete('/delete/{id}', [GroupController::class, 'delete']);
    });


    Route::prefix('class/')->group(function () {
        Route::get('available-classes/', [ClasseController::class, 'available_classes']);
        Route::get('all', [ClasseController::class, 'all']);
        Route::post('register', [ClasseController::class, 'register']);
        Route::post('edit/{id}', [ClasseController::class, 'edit']);
        Route::get('{id}', [ClasseController::class, 'show']);
        Route::delete('delete/{id}', [ClasseController::class, 'delete']);
        //get classes without groups assigned vvvv
        Route::get('group/{id}', [ClasseController::class, 'classes_by_group']);
    });
});



//Data Routes
