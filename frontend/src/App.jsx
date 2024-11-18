import React, { useState } from 'react';
import PlayerForm from './components/PlayerForm';
import PlayerList from './components/PlayerList';
import GuildList from './components/GuildList';

const App = () => {
    const [refresh, setRefresh] = useState(false);

    const handlePlayerAdded = () => {
        setRefresh(!refresh); // Força a atualização da lista de jogadores
    };

    return (
        <div>
            <h1>RPG Guild Maker</h1>
            <PlayerForm onPlayerAdded={handlePlayerAdded} />
            <PlayerList key={refresh} />
            <GuildList />
        </div>
    );
};

export default App;
