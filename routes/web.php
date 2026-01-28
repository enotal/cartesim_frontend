<?php

use App\Http\Controllers\DemandeController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\SessiondemandeController;
use App\Http\Controllers\SessionremiseController;
use App\Http\Controllers\SimController;
use App\Http\Controllers\SiteController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;




Route::get('/', function () {
    // $sessiondemandes = Sessiondemande::where
    return view('welcome');
})->name('welcome'); 

Route::get('/initier-demande', [DemandeController::class, 'guest_initier'])->name('demande-guest-initier'); 
Route::post('/initier-demande', [DemandeController::class, 'guest_initier_store'])->name('demande-guest-initier-store'); 
Route::get('/suivre-demande', [DemandeController::class, 'guest_suivre'])->name('demande-guest-suivre'); 

// Déclarer une perte
Route::get('/declarer-perte', [SimController::class, 'guest_declarer_perte'])->name('sim-guest-declarer-perte'); 
Route::patch('/declarer-perte', [SimController::class, 'update_guest_declarer_perte'])->name('sim-update-guest-declarer-perte'); 

Route::get('/dashboard', function () {
    return view('dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');

    // 
    Route::resource('users', UserController::class); 
    Route::resource('sessiondemandes', SessiondemandeController::class); 
    Route::resource('sessionremises', SessionremiseController::class); 
    Route::resource('sites', SiteController::class); 
    Route::resource('demandes', DemandeController::class);
    Route::get('demandes-nouvelles', [DemandeController::class, 'nouvelles_index'])->name('demandes-nouvelles-index');
    Route::get('demandes-traitees', [DemandeController::class, 'traitees_index'])->name('demandes-traitees-index'); 
    Route::resource('sims', SimController::class);
    // 
});

require __DIR__.'/auth.php';
