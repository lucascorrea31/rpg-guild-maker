import React, { useState } from "react";
import api from "../api";

import { ShieldAlert } from "lucide-react";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import GuildTable from "./GuildTable";

const GuildList = () => {
	const [guilds, setGuilds] = useState([]);
	const [numPlayersPerGuild, setNumPlayersPerGuild] = useState(3);
	const [error, setError] = useState(null);

	const fetchGuilds = async () => {
		setError(null);
		setGuilds([]);
		try {
			const response = await api.post("/guilds", { numPlayersPerGuild });
			setGuilds(response.data.guilds);
		} catch (error) {
			if (error.response && error.response.data) {
				setError(error.response.data);
			} else {
				console.error("Erro ao formar guildas:", error);
			}
		}
	};

	return (
		<Card className="w-full my-4">
			<CardHeader>
				<CardTitle>Guildas</CardTitle>
				<CardDescription>
					Forme as guildas com os jogadores disponíveis de forma equilibrada
					para ministrar seu jogo!
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className="max-w-[60%] flex flex-row gap-2 items-center justify-start">
					<Label htmlFor="numPlayersPerGuild" className="flex-none">
						Quantidade de jogadores por guilda
					</Label>
					<Input
						id="numPlayersPerGuild"
						className="w-20"
						type="number"
						min="1"
						value={numPlayersPerGuild}
						onChange={(e) => setNumPlayersPerGuild(Number(e.target.value))}
					/>
					<Button variant="outline" onClick={fetchGuilds}>
						Formar Guildas
					</Button>
				</div>

				{/* Exibe mensagem de erro, se houver */}
				{error && (
					<div>
						<div className="w-fit flex flex-row gap-4 items-center text-xl font-medium text-red-500 bg-red-50 px-4 py-2 my-4 rounded-sm border border-red-600">
							<ShieldAlert />
							<p>{error.error}</p>
						</div>

						{error.suggestion &&
							error.suggestion.availablePlayers &&
							error.suggestion.minPlayersPerGuild && (
								<div className="py-2 px-4">
									<h4 className="font-bold text-2xl">Sugestões:</h4>
									<br />

									<h5 className="font-semibold text-lg inline-block">
										Jogadores por Guilda sugeridos:
									</h5>
									<p className="inline-block text-lg ml-1">
										{error.suggestion.minPlayersPerGuild}
									</p>
									<br />

									<h5 className="font-semibold text-lg">
										Jogadores disponíveis:
									</h5>
									<ul className="list-decimal pl-8 mt-2">
										{error.suggestion.availablePlayers.map((player) => (
											<li key={player.id}>
												{player.name} - {player.class} (XP: {player.xp})
											</li>
										))}
									</ul>
								</div>
							)}

						{error.suggestion &&
							error.suggestion.formedGuilds &&
							error.suggestion.remainingPlayers && (
								<div className="py-2 px-4">
									<h4 className="font-bold text-2xl">Sugestões:</h4>
									<br />

									<h5 className="font-semibold text-xl">
										Guilda já formadas:{" "}
									</h5>

									<div className="w-full flex flex-row flex-wrap justify-start items-start content-start">
										<GuildTable
											guilds={error.suggestion.formedGuilds}></GuildTable>
									</div>

									<br />
									<hr />
									<br />

									<h5 className="font-semibold text-xl">
										Jogadores restantes:
									</h5>
									<ul>
										{error.suggestion.remainingPlayers.length > 0 ? (
											error.suggestion.remainingPlayers.map((player) => (
												<li key={player.id}>
													{player.name} - {player.class} (XP: {player.xp})
												</li>
											))
										) : (
											<i className="font-light text-md font-italic text-slate-500 mx-2 py-4">
												Nenhum jogador restante
											</i>
										)}
									</ul>
								</div>
							)}
					</div>
				)}

				{/* Exibe as guildas formadas */}
				{!error && (
					<div className="w-full flex flex-row flex-wrap justify-start items-start content-start">
						<GuildTable guilds={guilds}></GuildTable>
					</div>
				)}
			</CardContent>
		</Card>
	);
};

export default GuildList;
