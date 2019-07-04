<?php


// Route::get('/home','HomeController@index')->name('home');
Route::group(['middleware' => ['auth', 'verified']], function () {
    Route::get('/Inicio', 'InicioController@index')->name('inicio');
    Route::get('/Dashboart', 'Dashboart\DashboartController@index')->name('dashboart');
    // require __DIR__ . 'routes/dashboart/dashboart.php';
});
