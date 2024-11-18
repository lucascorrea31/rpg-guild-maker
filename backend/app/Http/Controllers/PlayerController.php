<?php

namespace App\Http\Controllers;

use App\Models\Player;
use Illuminate\Http\Request;

class PlayerController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Player::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'class' => 'required|in:Guerreiro,Mago,Arqueiro,Clérigo',
            'xp' => 'required|integer|min:1|max:100',
        ]);

        return Player::create($request->all());
    }

    /**
     * Display the specified resource.
     */
    public function show(Player $player)
    {
        return $player;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Player $player)
    {
        $request->validate([
            'name' => 'string|max:255',
            'class' => 'in:Guerreiro,Mago,Arqueiro,Clérigo',
            'xp' => 'integer|min:1|max:100',
            'confirmed' => 'boolean',
        ]);

        $player->update($request->all());
        return $player;
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Player $player)
    {
        $player->delete();
        return response()->noContent();
    }
}
