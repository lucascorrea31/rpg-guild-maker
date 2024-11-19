import React, { useEffect, useState } from "react";
import api from "../api";

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "./ui/table";
import {
	Select,
	SelectTrigger,
	SelectContent,
	SelectValue,
	SelectItem,
} from "./ui/select";
import { Pencil, Trash } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { ScrollArea } from "./ui/scroll-area";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

const PlayerTable = ({ players }) => {
	const [name, setName] = useState("");
	const [playerClass, setPlayerClass] = useState("");
	const [xp, setXp] = useState("0");

	const toggleConfirmation = async (player) => {
		try {
			const updatedPlayer = { ...player, confirmed: !player.confirmed };
			await api.put(`/players/${player.id}`, updatedPlayer);
		} catch (error) {
			console.error("Erro ao alterar confirmação:", error);
		}
	};

	const openModal = async (player) => {
		setName(player.name);
		setPlayerClass(player.class);
		setXp(player.xp);
	};

	const updatePlayer = async (player) => {
		try {
			await api.put(`/players/${player.id}`, {
				name,
				class: playerClass,
				xp: parseInt(xp),
				confirmed: player.confirmed,
			});
			fetchPlayers();
		} catch (error) {
			console.error("Erro ao editar jogador:", error);
		} finally {
		}
	};

	const removePlayer = async (player) => {
		try {
			const response = await api.delete(`/players/${player.id}`);
			fetchPlayers();
		} catch (error) {
			console.error("Erro ao remover o jogador:", error);
		}
	};

	return (
		<ScrollArea className="h-72 w-full rounded-sm border px-4 py-2">
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[5%]">#</TableHead>
						<TableHead className="w-[35%]">Nome</TableHead>
						<TableHead className="w-[30%]">Classe</TableHead>
						<TableHead className="w-[10%]">XP</TableHead>
						<TableHead className="w-[10%]">Confirmação</TableHead>
						<TableHead className="w-[10%]">Ação</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{players.map((player, index) => (
						<TableRow key={player.id}>
							<TableCell>{index + 1}.</TableCell>
							<TableCell className="font-medium">{player.name}</TableCell>
							<TableCell>{player.class}</TableCell>
							<TableCell>{player.xp}</TableCell>
							<TableCell>
								<Badge
									variant={player.confirmed ? "outlined" : "destructive"}
									className={
										(player.confirmed &&
											"text-green-600 border-green-600 bg-green-50") +
										" cursor-pointer"
									}
									onClick={() => toggleConfirmation(player)}>
									{player.confirmed ? "Dentro" : "Fora"}
								</Badge>
							</TableCell>
							<TableCell>
								<div className="items-top flex space-x-2">
									<Popover>
										<PopoverTrigger asChild>
											<Button
												className="my-1"
												variant="outline"
												size="icon"
												onClick={() => openModal(player)}>
												<Pencil />
											</Button>
										</PopoverTrigger>
										<PopoverContent className="w-80">
											<div className="grid gap-4">
												<div className="space-y-2">
													<h4 className="font-medium leading-none">
														Editar jogador
													</h4>
												</div>
												<div className="grid gap-2">
													<div className="grid grid-cols-3 items-center gap-4">
														<Label htmlFor="name">Nome</Label>
														<Input
															id="name"
															className="col-span-2"
															type="text"
															value={name}
															onChange={(e) => setName(e.target.value)}
															required
														/>
													</div>
													<div className="grid grid-cols-3 items-center gap-4">
														<Label htmlFor="player-class">Classe</Label>
														<Select
															className="col-span-2"
															defaultValue={playerClass}
															onValueChange={(value) => setPlayerClass(value)}>
															<SelectTrigger
																className="col-span-2"
																id="player-class">
																<SelectValue placeholder="Selecione a classe" />
															</SelectTrigger>
															<SelectContent position="popper">
																<SelectItem value="Guerreiro">
																	Guerreiro
																</SelectItem>
																<SelectItem value="Mago">Mago</SelectItem>
																<SelectItem value="Arqueiro">
																	Arqueiro
																</SelectItem>
																<SelectItem value="Clérigo">Clérigo</SelectItem>
															</SelectContent>
														</Select>
													</div>
													<div className="grid grid-cols-3 items-center gap-4">
														<Label htmlFor="xp">XP</Label>
														<Input
															id="xp"
															type="number"
															className="col-span-2 h-8"
															value={xp}
															onChange={(e) => setXp(e.target.value)}
															required
															min="1"
															max="100"
														/>
													</div>
												</div>
												<div className="flex items-center justify-end">
													<Button onClick={() => updatePlayer(player)}>
														Salvar
													</Button>
												</div>
											</div>
										</PopoverContent>
									</Popover>
									<Button
										className="my-1"
										variant="destructive"
										size="icon"
										onClick={() => removePlayer(player)}>
										<Trash />
									</Button>
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</ScrollArea>
	);
};

export default PlayerTable;
