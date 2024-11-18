import React, { useState } from 'react';
import api from '../api';

const GuildList = () => {
    const [guilds, setGuilds] = useState([]);
    const [numPlayersPerGuild, setNumPlayersPerGuild] = useState(3);
    const [error, setError] = useState(null);

    const fetchGuilds = async () => {
        setError(null);
        setGuilds([]);
        try {
            const response = await api.post('/guilds', { numPlayersPerGuild });
            setGuilds(response.data.guilds);
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data);
            } else {
                console.error('Erro ao formar guildas:', error);
            }
        }
    };

    return (
        <div>
            <h2>Guildas</h2>
            <div>
                <label>
                    Jogadores por Guilda:
                    <input
                        type="number"
                        value={numPlayersPerGuild}
                        onChange={(e) => setNumPlayersPerGuild(Number(e.target.value))}
                        min="1"
                    />
                </label>
                <button onClick={fetchGuilds}>Formar Guildas</button>
            </div>

            {/* Exibe mensagem de erro, se houver */}
            {error && (
                <div style={{ color: 'red' }}>
                    <p>{error.error}</p>
                    {error.suggestion && error.suggestion.availablePlayers && error.suggestion.minPlayersPerGuild && (
                        <div>
                            <h4>Sugestões:</h4>
                            <p>Jogadores por Guilda sugeridos: {error.suggestion.minPlayersPerGuild}</p>
                            <p>Jogadores disponíveis:</p>
                            <ul>
                                {error.suggestion.availablePlayers.map((player) => (
                                    <li key={player.id}>
                                        {player.name} - {player.class} (XP: {player.xp})
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                    {error.suggestion && error.suggestion.formedGuilds && error.suggestion.remainingPlayers && (
                        <div>
                            <h4>Sugestões:</h4>
                            <p>Guilda já formadas: </p>
                            {error.suggestion.formedGuilds.map((guild, index) => (
                                <div key={index}>
                                    <h3>Guilda {index + 1}</h3>
                                    <ul>
                                        {guild.guild.map((player) => (
                                            <li key={player.id}>
                                                {player.name} - {player.class} (XP: {player.xp})
                                            </li>
                                        ))}
                                    </ul>
                                    <p>Total XP: {guild.xp}</p>
                                </div>
                            ))}
                            <hr />
                            <p>Jogadores restantes:</p>
                            <ul>
                                {error.suggestion.remainingPlayers.map((player) => (
                                    <li key={player.id}>
                                        {player.name} - {player.class} (XP: {player.xp})
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </div>
            )}

            {/* Exibe as guildas formadas */}
            <div>
                {guilds.map((guild, index) => (
                    <div key={index}>
                        <h3>Guilda {index + 1}</h3>
                        <ul>
                            {guild.guild.map((player) => (
                                <li key={player.id}>
                                    {player.name} - {player.class} (XP: {player.xp})
                                </li>
                            ))}
                        </ul>
                        <p>Total XP: {guild.xp}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default GuildList;
