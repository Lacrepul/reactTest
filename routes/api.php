<?php

use Illuminate\Http\Request;


Route::get('products', 'ProductsController@index');
 
Route::post('products', 'ProductsController@store');
 
Route::put('products/{product}', 'ProductsController@update');
 
Route::delete('products/{product}', 'ProductsController@delete');