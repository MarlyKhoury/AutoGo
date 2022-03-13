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
    Route::get('/user-profile', [AuthController::class, 'userProfile']); 
    Route::post('/ban', [AuthController::class, 'ban']);   
    Route::get('/bannedStatus/{id}', [AuthController::class, 'bannedStatus']);
    Route::get('/unban/{id}', [AuthController::class, 'unban']);
    Route::post('/createCar', [AuthController::class, 'createCar']);
    Route::delete('/deleteCar', [AuthController::class, 'deleteCar']);
    Route::post('/createRide', [AuthController::class, 'createRide']);
    Route::post('/bookRide', [AuthController::class, 'bookRide']);
    Route::get('/getRides', [AuthController::class, 'getRides']);
    Route::post('/cancelBooking', [AuthController::class, 'cancelBooking']);
    Route::get('/getUsers', [AuthController::class, 'getUsers']);
    Route::post('/uploadImg', [AuthController::class, 'uploadImg']);
});