<?php

namespace App\Http\Controllers;

use App\Models\Player;
use Illuminate\Http\Request;

class GuildController extends Controller
{
    public function formGuilds(Request $request)
    {
        $players = Player::where('confirmed', true)->get();

        // Separar jogadores por classe
        $classes = $players->groupBy('class');

        $guilds = [];
        while ($players->isNotEmpty()) {
            $guild = collect();

            // Adicionar um Clérigo
            if (isset($classes['Clérigo']) && $classes['Clérigo']->isNotEmpty()) {
                $guild->push($classes['Clérigo']->shift());
            }

            // Adicionar um Guerreiro
            if (isset($classes['Guerreiro']) && $classes['Guerreiro']->isNotEmpty()) {
                $guild->push($classes['Guerreiro']->shift());
            }

            // Adicionar um Mago ou Arqueiro
            if ((isset($classes['Mago']) && $classes['Mago']->isNotEmpty())) {
                $guild->push($classes['Mago']->shift());
            } elseif (isset($classes['Arqueiro']) && $classes['Arqueiro']->isNotEmpty()) {
                $guild->push($classes['Arqueiro']->shift());
            }

            // Balancear XP
            $guildXp = $guild->sum('xp');
            $guilds[] = ['guild' => $guild, 'xp' => $guildXp];

            $players = $players->filter(function ($player) use ($guild) {
                return !$guild->contains($player);
            });
        }

        return response()->json(['guilds' => $guilds]);
    }
}
