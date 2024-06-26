<?php

use App\Http\Controllers\BulletinAPIController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

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

//Route::get('bulletin',[BulletinController::class,'showPublic']);
Route::resource('bulletin', BulletinAPIController::class);
Route::put('admin/bulletin/{id}', "App\Http\Controllers\BulletinAPIController@update");
//Route::middleware(['auth','level:3'])->prefix('admin')->group(function(){
//    Route::resource('bulletin',BulletinAPIController::class);
//});
