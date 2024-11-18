import React, { useEffect, useState } from 'react';
import api from '../api';

const PlayerList = () => {
    const [players, setPlayers] = useState([]);

    const fetchPlayers = async () => {
        try {
            const response = await api.get('/players');
            setPlayers(response.data);
        } catch (error) {
            console.error('Erro ao buscar jogadores:', error);
        }
    };

    const toggleConfirmation = async (player) => {
        try {
            const updatedPlayer = { ...player, confirmed: !player.confirmed };
            await api.put(`/players/${player.id}`, updatedPlayer);
            fetchPlayers();
        } catch (error) {
            console.error('Erro ao alterar confirmação:', error);
        }
    };

    useEffect(() => {
        fetchPlayers();
    }, []);

    return (
        <div>
            <h2>Jogadores</h2>
            <ul>
                {players.map((player) => (
                    <li key={player.id}>
                        {player.name} - {player.class} (XP: {player.xp}){' '}
                        {player.confirmed ? '✅ Confirmado' : '❌ Não Confirmado'}
                        <button onClick={() => toggleConfirmation(player)}>
                            {player.confirmed ? 'Desmarcar' : 'Confirmar'}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PlayerList;
