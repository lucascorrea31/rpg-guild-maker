<?php

use App\Http\Controllers\PlayerController;
use App\Http\Controllers\GuildController;

Route::apiResource('players', PlayerController::class);
Route::post('guilds', [GuildController::class, 'formGuilds']);
