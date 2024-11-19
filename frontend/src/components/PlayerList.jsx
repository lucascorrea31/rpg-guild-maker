import React, { useEffect, useState } from "react";
import api from "../api";

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card";
import PlayerTable from "./PlayerTable";

const PlayerList = () => {
	const [players, setPlayers] = useState([]);

	const fetchPlayers = async () => {
		try {
			const response = await api.get("/players");
			setPlayers(response.data);
		} catch (error) {
			console.error("Erro ao buscar jogadores:", error);
		}
	};

	useEffect(() => {
		fetchPlayers();
	}, [players]);

	return (
		<Card className="min-w-[350px]">
			<CardHeader>
				<CardTitle>Jogadores</CardTitle>
				<CardDescription>
					Lista de jogadores já cadastrados. Você pode confirmar ou desconfirmar
					cada jogador para montar as guildas.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<PlayerTable players={players} />
			</CardContent>
		</Card>
	);
};

export default PlayerList;
