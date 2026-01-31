// Future use: API functions for user management
import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const getAllUsers = async () => {
	const response = await axios.get(`${API_URL}/users`);
	console.log(response);
	return response.data;
};
