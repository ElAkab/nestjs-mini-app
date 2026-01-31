import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Import jwtDecode to decode JWT tokens

export function getProfile(token: string) {
	const decoded: any = jwtDecode(token);
	const userId = decoded.id || decoded.userId || decoded.sub;
	return axios.get(`http://localhost:3000/api/profile/${userId}`, {
		// Include the token in the Authorization header
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
}

export default function setProfile(token: string, data: any) {
	const decoded: any = jwtDecode(token);
	const userId = decoded.id || decoded.userId || decoded.sub;
	return axios.put(`http://localhost:3000/api/profile/${userId}`, data, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
}
