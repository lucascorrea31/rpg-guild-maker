import axios from "axios";

const api = axios.create({
	baseURL: "https://rpg-guild-maker-backend-qmcc9njsu.vercel.app/_api",
});

export default api;
