import { useNavigate } from "react-router-dom";
import InputField from "../components/InputField";
import Button from "../components/Button";
import { useForm, type SubmitHandler } from "react-hook-form";
import { signup } from "../api/auth";
import axios from "axios";

type Inputs = {
	email: string;
	password: string;
};

export default function Register() {
	const { register, handleSubmit, watch } = useForm<Inputs>();
	const navigate = useNavigate();

	const onSubmit: SubmitHandler<Inputs> = async (data) => {
		console.log(data);
		// navigate("/dashboard");

		const email = data.email;
		const password = data.password;

		if (!email || !password) {
			alert("Please enter both email and password.");
			return;
		}

		if (password.length < 6) {
			alert("Password must be at least 6 characters long.");
			return;
		}

		try {
			const response = await signup(email, password);

			// Axios -> la vraie data est dans response.data
			console.log(response.data);

			alert(`Registered! Welcome ${email.split("@")[0]}!`);
			navigate("/login");
		} catch (error) {
			if (axios.isAxiosError(error)) {
				const message =
					error.response?.data?.message ||
					"Registration failed. Please try again.";

				console.error("Registration failed:", error.response?.data);
				alert(message);
			} else {
				console.error("Unexpected error:", error);
				alert("Unexpected error occurred.");
			}
		}
		// Simulate registration logic here

		// Show the registered email and password in the console
		// console.log(
		// 	"Registering user with email:",
		// 	email,
		// 	"and password:",
		// 	password,
		// );
	};

	console.log(watch("email")); // watch input value by passing the name of it

	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
			<form
				className="flex flex-col gap-4 w-80 mt-6 border-2 border-gray-800 p-6 rounded-lg shadow-lg bg-white"
				onSubmit={handleSubmit(onSubmit)}
			>
				<h1 className="text-4xl text-center font-bold text-blue-600 mb-3">
					Register Page
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
					Register
				</Button>
			</form>
		</div>
	);
}
