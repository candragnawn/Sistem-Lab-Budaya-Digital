<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\HKIController;
use App\Http\Controllers\Api\LecturerController;


Route::get('/hki', [HKIController::class, 'index'])->name('');

Route::get('/', function () {
    return view('welcome');
});


//lecturer
Route::get('/lecturer', [LecturerController::class, 'show'])->name('lecturer.index');
Route::post('/lecturer/input', [LecturerController::class, 'create'])->name('lecturer.create');