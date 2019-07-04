<?php

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
    return view('welcome');
});
Route::get('/portafolio', 'PortafolioController@index')->name('portafolio');

/* Route::get('/envato-user-helper-demo', function () {
    return EnventoUser::get_username(1);
}); */

Route::get('/home', function () {
    return view('home');
})->name('home');



Auth::routes(['verify' => true]);

/*
Route::group(['middleware' => ['auth']], function () {
    require (__DIR__ . 'routes/web/dashboart.php');
});
 */
