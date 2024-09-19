<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\App;
use App\Mail\ChangePasswordMail;
use App\Models\User;

Route::get('/{any}', function () {
    return file_get_contents(public_path('index.html'));
})->where('any', '.*');

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "web" middleware group. Make something great!
|
*/
