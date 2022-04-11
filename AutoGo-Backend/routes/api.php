<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AdminController;
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

Route::group(['middleware' => ['auth:api']], function () {

    Route::group(['prefix' => 'auth'], function () {
        Route::post('/logout', [AuthController::class, 'logout']); 
        Route::post('/refresh', [AuthController::class, 'refresh']);
    
});

    Route::group(['prefix' => 'user'], function () {
        Route::get('/user-profile', [UserController::class, 'userProfile']); 
        Route::post('/postReview', [UserController::class, 'postReview']);
        Route::post('/createCar', [UserController::class, 'createCar']);
        Route::post('/bookRide', [UserController::class, 'bookRide']);
        Route::get('/getCar', [UserController::class, 'getCar']);
        Route::post('/updateInfo', [UserController::class, 'updateInfo']);
        Route::post('/editReview', [UserController::class, 'editReview']);
        Route::post('/createRide', [UserController::class, 'createRide']);
        Route::get('/getownInfo', [UserController::class, 'getownInfo']);
        Route::get('/getallReviews/{id}', [UserController::class, 'getallReviews']);
        Route::delete('/deleteCar', [UserController::class, 'deleteCar']);
        Route::delete('/deleteReview/{id}', [UserController::class, 'deleteReview']);
        Route::post('/uploadImg', [UserController::class, 'uploadImg']);
        Route::get('/getRides/{from}/{to}', [UserController::class, 'getRides']);
        Route::get('/getuserInfo/{id}', [UserController::class, 'getuserInfo']);
        Route::post('/cancelBooking', [UserController::class, 'cancelBooking']);    
    });

    Route::group(['prefix' => 'admin'], function () {
        Route::post('/ban', [AdminController::class, 'ban']);   
        Route::get('/bannedStatus/{id}', [AdminController::class, 'bannedStatus']);
        Route::get('/unban/{id}', [AdminController::class, 'unban']);
        Route::get('/getUsers', [AdminController::class, 'getUsers']);
    });
});

Route::group(['prefix' => 'auth'], function () {
    Route::post('/login', [AuthController::class, 'login']);
    Route::post('/register', [AuthController::class, 'register']);
    Route::get('/notFound', [AuthController::class, 'notFound'])->name('not-found');
});