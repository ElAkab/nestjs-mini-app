// AuthContext.tsx
import React, { createContext, useState, useContext, useEffect } from "react";
// createContext = function to create a context
// useState = React hook to manage state
// useContext = React hook to consume context
// useEffect = React hook to run side effects
import type { ReactNode } from "react";
import axios from "axios";

interface AuthContextType {
	isAuthenticated: boolean;
	user: { id: number; email: string } | null;
	login: () => void; // Function to log in
	logout: () => void; // Function to log out
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const [user, setUser] = useState<{ id: number; email: string } | null>(null);

	useEffect(() => {
		// Appel à /api/users/me pour récupérer l'utilisateur courant
		axios
			.get("/api/users/me", { withCredentials: true })
			.then((res) => {
				if (res.data && res.data.id && res.data.email) {
					setUser({ id: res.data.id, email: res.data.email });
					setIsAuthenticated(true);
				} else {
					setUser(null);
					setIsAuthenticated(false);
				}
			})
			.catch(() => {
				setUser(null);
				setIsAuthenticated(false);
			});
	}, []);

	const login = () => setIsAuthenticated(true);
	const logout = () => {
		setIsAuthenticated(false);
		setUser(null);
		// Optionnel : appeler l'API de logout
	};

	return (
		<AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
			{children}
		</AuthContext.Provider>
	);
};

export const useAuth = (): AuthContextType => {
	const context = useContext(AuthContext);
	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
};
