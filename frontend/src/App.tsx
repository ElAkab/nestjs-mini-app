// App.tsx
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Header from "./components/Header";
import Profile from "./pages/Profile";

export default function App() {
	return (
		<BrowserRouter>
			{/* Navigation */}
			<Header
				title="Learning NestJS"
				links={[
					{ href: "/", label: "Home" },
					{ href: "/register", label: "Register" },
					{ href: "/login", label: "Login" },
				]}
			/>

			{/* Routes */}
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/register" element={<Register />} />
				<Route path="/login" element={<Login />} />
				<Route path="/profile" element={<Profile />} />
			</Routes>
		</BrowserRouter>
	);
}
