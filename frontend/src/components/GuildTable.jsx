import React from "react";

import {
	Table,
	TableBody,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow,
} from "./ui/table";

const GuildTable = ({ guilds }) => {
	return guilds.map((guild, index) => (
		<div
			key={index}
			className="w-fit px-4 py-2 m-2 rounded-md shadow-sm border border-slate-200 hover:shadow-md hover:bg-slate-50/40">
			<Table className="w-[350px]">
				<TableHeader>
					<TableRow>
						<TableHead colSpan={4}>
							<h3 className="text-2xl font-bold text-black">
								Guild {index + 1}
							</h3>
						</TableHead>
					</TableRow>
					<TableRow>
						<TableHead className="w-[5%]">#</TableHead>
						<TableHead className="w-[40%]">Nome</TableHead>
						<TableHead className="w-[35%]">Classe</TableHead>
						<TableHead className="w-[20%]">XP</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{guild.guild.map((player, index) => (
						<TableRow key={player.id}>
							<TableCell>{index + 1}.</TableCell>
							<TableCell className="font-medium">{player.name}</TableCell>
							<TableCell>{player.class}</TableCell>
							<TableCell>{player.xp}</TableCell>
						</TableRow>
					))}
				</TableBody>
				<TableFooter>
					<TableRow>
						<TableCell colSpan={3}>Total XP:</TableCell>
						<TableCell>{guild.xp}</TableCell>
					</TableRow>
				</TableFooter>
			</Table>
		</div>
	));
};

export default GuildTable;
