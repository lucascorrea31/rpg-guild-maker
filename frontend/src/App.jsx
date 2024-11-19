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
			<h1 className="text-3xl font-bold py-4 text-center mb-4">
				RPG Guild Maker
			</h1>
			<div className="flex flex-row items-stretch justify-between gap-4">
				<PlayerForm onPlayerAdded={handlePlayerAdded} />
				<PlayerList key={refresh} />
			</div>
			<GuildList />
		</div>
	);
};

export default App;
