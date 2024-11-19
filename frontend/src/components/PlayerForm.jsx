import React, { useState } from "react";
import api from "../api";

import { Button } from "./ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Checkbox } from "./ui/checkbox";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "./ui/select";

const PlayerForm = ({ onPlayerAdded }) => {
	const [name, setName] = useState("");
	const [playerClass, setPlayerClass] = useState("Guerreiro");
	const [xp, setXp] = useState("");
	const [confirmed, setConfirmed] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await api.post("/players", {
				name,
				class: playerClass,
				xp: parseInt(xp),
				confirmed,
			});
			onPlayerAdded(response.data);
			setName("");
			setPlayerClass("Guerreiro");
			setXp("");
			setConfirmed(false);
		} catch (error) {
			console.error("Erro ao cadastrar jogador:", error);
		}
	};

	return (
		<Card className="min-w-[300px] max-w-[40%]">
			<CardHeader>
				<CardTitle>Cadastro</CardTitle>
				<CardDescription>
					Cadastre um novo jogador para montar suas guildas.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<form onSubmit={handleSubmit}>
					<div className="grid w-full items-center gap-4">
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="name">Nome</Label>
							<Input
								id="name"
								type="text"
								placeholder="Nome"
								value={name}
								onChange={(e) => setName(e.target.value)}
								required
							/>
						</div>
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="player-class">Classe</Label>
							<Select
								value={playerClass}
								onChange={(e) => setPlayerClass(e.target.value)}>
								<SelectTrigger id="player-class">
									<SelectValue placeholder="Selecione a classe" />
								</SelectTrigger>
								<SelectContent position="popper">
									<SelectItem value="Guerreiro">Guerreiro</SelectItem>
									<SelectItem value="Mago">Mago</SelectItem>
									<SelectItem value="Arqueiro">Arqueiro</SelectItem>
									<SelectItem value="Clérigo">Clérigo</SelectItem>
								</SelectContent>
							</Select>
						</div>
						<div className="flex flex-col space-y-1.5">
							<Label htmlFor="xp">XP</Label>
							<Input
								id="xp"
								type="number"
								placeholder="XP"
								value={xp}
								onChange={(e) => setXp(e.target.value)}
								required
								min="1"
								max="100"
							/>
						</div>
						<div className="items-top flex space-x-2">
							<Checkbox
								id="confirmed"
								onChange={(e) => setConfirmed(e.target.checked)}
							/>
							<div className="grid gap-1.5 leading-none">
								<label
									htmlFor="confirmed"
									className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
									Confirmado
								</label>
							</div>
						</div>
					</div>
				</form>
			</CardContent>
			<CardFooter className="flex justify-between">
				<Button>Cadastrar</Button>
			</CardFooter>
		</Card>
	);
};

export default PlayerForm;
