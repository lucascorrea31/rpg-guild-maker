<?php

use App\Http\Controllers\GuildController;
use App\Http\Controllers\PlayerController;
use Illuminate\Support\Facades\Route;

Route::apiResource('players', PlayerController::class);
Route::post('guilds', [GuildController::class, 'formGuilds']);
