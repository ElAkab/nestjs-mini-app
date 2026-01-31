// auth.ts : API functions for authentication
import axios from "axios";

const API_URL = "http://localhost:3000/api/users";

export const signup = async (email: string, password: string) => {
	const response = await axios.post(`${API_URL}/signup`, { email, password });
	console.log(response);
	return response.data;
};

export const login = async (email: string, password: string) => {
	const response = await axios.post(`${API_URL}/login`, { email, password });
	console.log(response);
	return response.data;
};

export const logout = async () => {
	const response = await axios.post(`${API_URL}/logout`);
	console.log(response);
	return response.data;
};

export const getCurrentUser = async () => {
	const response = await axios.get(`${API_URL}/me`);
	console.log(response);
	return response.data;
};
