<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PelaksanaanPenelitian\HKIController;


Route::get('/hki', [HKIController::class, 'index'])->name('');

Route::get('/', function () {
    return view('welcome');
});
