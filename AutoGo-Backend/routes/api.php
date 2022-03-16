<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group([
    'middleware' => 'api',
    'prefix' => 'auth'
], function ($router) {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::post('/logout', [AuthController::class, 'logout']); 
    Route::post('/refresh', [AuthController::class, 'refresh']);
    Route::post('/postReview', [AuthController::class, 'postReview']);
    Route::post('/ban', [AuthController::class, 'ban']);   
    Route::post('/createCar', [AuthController::class, 'createCar']);
    Route::post('/updateInfo', [AuthController::class, 'updateInfo']);
    Route::post('/editReview', [AuthController::class, 'editReview']);
    Route::post('/createRide', [AuthController::class, 'createRide']);
    Route::post('/bookRide', [AuthController::class, 'bookRide']);
    Route::post('/cancelBooking', [AuthController::class, 'cancelBooking']);
    Route::post('/uploadImg', [AuthController::class, 'uploadImg']);
    Route::get('/user-profile', [AuthController::class, 'userProfile']); 
    Route::get('/bannedStatus/{id}', [AuthController::class, 'bannedStatus']);
    Route::get('/unban/{id}', [AuthController::class, 'unban']);
    Route::get('/getRides', [AuthController::class, 'getRides']);
    Route::get('/getUsers', [AuthController::class, 'getUsers']);
    Route::get('/getuserInfo/{id}', [AuthController::class, 'getuserInfo']);
    Route::get('/getallReviews/{id}', [AuthController::class, 'getallReviews']);
    Route::delete('/deleteCar', [AuthController::class, 'deleteCar']);
    Route::delete('/deleteReview/{id}', [AuthController::class, 'deleteReview']);

    // Route::post('/Image', [AuthController::class, 'Image']);
});