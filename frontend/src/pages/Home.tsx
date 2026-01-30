import { useState } from "react";

export default function Home() {
	const [isActive, setIsActive] = useState(false);

	const handleOnClick = () => {
		console.log("button clicked");
		setIsActive((prev) => !prev);
	};

	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
			<h1 className="text-4xl font-bold text-gray-800 text-center">
				Welcome to a simple project! Dedicated to learning{" "}
				<a
					href="https://docs.nestjs.com/first-steps"
					className="bg-linear-to-bl from-yellow-400 via-yellow-600 to-yellow-800 bg-clip-text text-transparent underline font-bold"
				>
					NestJS
				</a>
			</h1>

			{/* Bouton stylé */}
			<button
				onClick={() => handleOnClick()}
				className={`
          mt-8 px-6 py-3 rounded-lg font-semibold text-white
          bg-linear-to-bl from-blue-400 via-blue-600 to-blue-800 hover:from-blue-500 hover:via-blue-700 hover:to-blue-900 active:scale-95
          shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer
        `}
			>
				And..
			</button>

			{/* Contenu affiché */}
			{isActive && (
				<div className="mt-6 text-gray-700 text-center">
					<p>
						Also learning{" "}
						<a
							className="font-bold bg-linear-to-bl from-purple-400 via-purple-600 to-purple-800 bg-clip-text text-transparent"
							href="https://www.prisma.io/"
						>
							Prisma
						</a>{" "}
						and{" "}
						<a
							className="font-bold bg-linear-to-bl from-cyan-400 via-cyan-600 to-cyan-800 bg-clip-text text-transparent"
							href="https://react.dev/"
						>
							React
						</a>
						!
					</p>
				</div>
			)}
		</div>
	);
}
