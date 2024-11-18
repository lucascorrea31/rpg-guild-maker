import React, { useState } from 'react';
import api from '../api';

const PlayerForm = ({ onPlayerAdded }) => {
    const [name, setName] = useState('');
    const [playerClass, setPlayerClass] = useState('Guerreiro');
    const [xp, setXp] = useState('');
    const [confirmed, setConfirmed] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post('/players', {
                name,
                class: playerClass,
                xp: parseInt(xp),
                confirmed,
            });
            onPlayerAdded(response.data);
            setName('');
            setPlayerClass('Guerreiro');
            setXp('');
            setConfirmed(false);
        } catch (error) {
            console.error('Erro ao cadastrar jogador:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />
            <select value={playerClass} onChange={(e) => setPlayerClass(e.target.value)}>
                <option value="Guerreiro">Guerreiro</option>
                <option value="Mago">Mago</option>
                <option value="Arqueiro">Arqueiro</option>
                <option value="Clérigo">Clérigo</option>
            </select>
            <input
                type="number"
                placeholder="XP"
                value={xp}
                onChange={(e) => setXp(e.target.value)}
                required
                min="1"
                max="100"
            />
            <label>
                Confirmado:
                <input
                    type="checkbox"
                    checked={confirmed}
                    onChange={(e) => setConfirmed(e.target.checked)}
                />
            </label>
            <button type="submit">Cadastrar</button>
        </form>
    );
};

export default PlayerForm;
