<?php

namespace App\Http\Controllers;

use App\Models\Player;
use Illuminate\Http\Request;

class GuildController extends Controller
{
    public function formGuilds(Request $request)
    {
        $players = Player::where('confirmed', true)->get();
        $numPlayersPerGuild = $request->input('numPlayersPerGuild', 3); // Valor padrão: 3
        $totalPlayers = $players->count();

        if ($totalPlayers < $numPlayersPerGuild) {
            return response()->json([
                'error' => 'Número insuficiente de jogadores confirmados.',
                'suggestion' => [
                    'minPlayersPerGuild' => $totalPlayers,
                    'availablePlayers' => $players,
                ]
            ], 400);
        }

        $classes = $players->groupBy('class');

        $guilds = [];
        while ($players->isNotEmpty()) {
            $guild = collect();

            if ($guild->count() < $numPlayersPerGuild && isset($classes['Clérigo']) && $classes['Clérigo']->isNotEmpty()) {
                $guild->push($classes['Clérigo']->shift());
            }

            if ($guild->count() < $numPlayersPerGuild && isset($classes['Guerreiro']) && $classes['Guerreiro']->isNotEmpty()) {
                $guild->push($classes['Guerreiro']->shift());
            }

            if ($guild->count() < $numPlayersPerGuild) {
                if (isset($classes['Mago']) && $classes['Mago']->isNotEmpty()) {
                    $guild->push($classes['Mago']->shift());
                } elseif (isset($classes['Arqueiro']) && $classes['Arqueiro']->isNotEmpty()) {
                    $guild->push($classes['Arqueiro']->shift());
                }
            }

            $players = $players->filter(function ($player) use ($guild) {
                return !$guild->contains($player);
            })->flatten();

            while ($guild->count() < $numPlayersPerGuild && $players->isNotEmpty()) {
                $guild->push($players->shift());
            }

            $guild = $guild->unique();

            // Balancear XP
            $guildXp = $guild->sum('xp');
            $guilds[] = ['guild' => $guild, 'xp' => $guildXp];

            // Se a guilda formada não tiver o número correto de jogadores, retorna erro
            if ($guild->count() < $numPlayersPerGuild) {
                return response()->json([
                    'error' => 'Número insuficiente de jogadores para completar guildas ideais.',
                    'suggestion' => [
                        'formedGuilds' => $guilds,
                        'remainingPlayers' => $players,
                    ]
                ], 400);
            }
        }

        return response()->json(['guilds' => $guilds]);
    }
}
