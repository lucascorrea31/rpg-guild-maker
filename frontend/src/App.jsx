import React, { useState } from "react";
import PlayerForm from "./components/PlayerForm";
import PlayerList from "./components/PlayerList";
import GuildList from "./components/GuildList";
import "./index.css";

const App = () => {
	const [refresh, setRefresh] = useState(false);

	const handlePlayerAdded = () => {
		setRefresh(!refresh);
	};

	return (
		<div className="container mx-auto px-4">
			<div className="w-fit p-4 absolute left-16 top-2 text-2xl font-black antialiased tracking-tight rounded-full shadow-sm shadow-slate-800/30 bg-slate-100/30 text-black cursor-pointer hover:shadow-md hover:brightness-150 hover:scale-105 transition-all">
				GM
			</div>
			<h1 className="text-3xl font-bold py-4 text-center mb-4">
				RPG Guild Maker
			</h1>
			<div className="flex flex-row items-stretch justify-between gap-4">
				<PlayerForm onPlayerAdded={handlePlayerAdded} />
				<PlayerList key={refresh} />
			</div>
			<GuildList />
			<div className="w-full mx-auto my-4 py-2 px-4 text-center text-sm italic text-slate-500">
				Criado por:{" "}
				<a
					href="https://linktr.ee/lucascorrea31"
					target="_blank"
					className="hover:underline hover:text-black hover:scale-105 transition-all">
					Lucas Tadeu Correa de Oliveira
				</a>{" "}
				@ {new Date().getFullYear()}
			</div>
		</div>
	);
};

export default App;
