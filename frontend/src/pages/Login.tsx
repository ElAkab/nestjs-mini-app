import axios from "axios";
import { useForm, type SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { login } from "../api/auth";
import Button from "../components/Button";
import InputField from "../components/InputField";

type Inputs = {
	email: string;
	password: string;
};

export default function Login() {
	const { register, handleSubmit } = useForm<Inputs>();
	const navigate = useNavigate();

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		const email = data.email;
		const password = data.password;

		if (!email || !password) {
			alert("Please enter both email and password.");
			return;
		}

		// Show the registered email and password in the console
		// console.log(
		// 	"Logging in user with email:",
		// 	email,
		// 	"and password:",
		// 	password,
		// );

		try {
			const response = await login(email, password);
			console.log(response.data);

			alert(`Logged in! Welcome ${email.split("@")[0]}!`);
			navigate("/profile");
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const message =
					error.response?.data?.message || "Login failed. Please try again.";

				console.error("Login failed:", error.response?.data);
				alert(message);
			} else {
				console.error("Unexpected error:", error);
				alert("Unexpected error occurred.");
			}
		}
	};

	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
			<form
				className="flex flex-col gap-4 w-80 mt-6 border-2 border-gray-800 p-6 rounded-lg shadow-lg bg-white"
				onSubmit={handleSubmit(onSubmit)}
			>
				<h1 className="text-4xl text-center font-bold text-blue-600 mb-3">
					Login Page
				</h1>
				<hr />
				<InputField
					label="Email"
					type="email"
					placeholder="Enter your email"
					required
					{...register("email", { required: true })}
				/>
				<InputField
					label="Password"
					type="password"
					placeholder="Enter your password"
					required
					{...register("password", { required: true })}
				/>
				<Button type="submit" className="mt-2">
					Login
				</Button>
			</form>
		</div>
	);
}
