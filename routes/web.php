<?php

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\BulletinController;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Home', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth'])->name('dashboard');

Route::middleware(['auth','level:3'])->prefix('admin')->group(function(){
    Route::get('/',function (){
        return Inertia::render('Admin');
    })->name('Admin Home');
    Route::put('bulletin/{id}', 'App\Http\Controllers\BulletinController@update');
    Route::resource('bulletin',BulletinController::class,['as'=>'admin','except'=>'update']);
//    Route::prefix('/bulletin')->group(function () {
//        Route::get('/', function () {
//            return Inertia::render('Admin_bulletin');
//        })->name('Admin Bulletin');
//
//    });
});

require __DIR__.'/auth.php';
