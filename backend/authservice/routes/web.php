<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It is a breeze. Simply tell Lumen the URIs it should respond to
| and give it the Closure to call when that URI is requested.
|
*/

$router->get('/', function () use ($router) {
    return $router->app->version();
});

$router->group(["prefix" => "api"] , function () use ($router) {
    //login
    $router->post('login', 'authController@login');

    //reset password
    $router->post('password/create', 'PasswordResetController@create');
    $router->get('password/find/{token}', 'PasswordResetController@find');
    $router->post('password/reset', 'PasswordResetController@reset');

    $router->group(["middleware" => ["auth:api_admin"]] , function () use ($router) {
        $router->post('etudiant/ajouter', 'UserController@store');
        $router->get('etudiant', 'UserController@index');
        $router->get('etudiant/{etudiant_id}', 'UserController@show');
    }) ;

} ) ;
