import { useState } from "react";

export default function Home() {
	const [isActive, setIsActive] = useState(false);

	const handleOnClick = (id: number) => {
		console.log("button clicked " + id);
		setIsActive((prev) => !prev);
	};

	return (
		<div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-4">
			<h1 className="text-4xl font-bold text-gray-800 text-center">
				Welcome to a simple project! Dedicated to learning{" "}
				<a
					href="https://docs.nestjs.com/first-steps"
					className="text-yellow-800 underline"
				>
					NestJS
				</a>
			</h1>

			{/* Bouton stylé */}
			<button
				onClick={() => handleOnClick(2)}
				className={`
          mt-8 px-6 py-3 rounded-lg font-semibold text-white
          bg-blue-600 hover:bg-blue-700 active:scale-95
          shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer
        `}
			>
				Maybe..
			</button>

			{/* Contenu affiché */}
			{isActive && (
				<div className="mt-6 text-gray-700 text-center">
					<p>
						Also learning{" "}
						<a className="font-bold" href="https://www.prisma.io/">
							Prisma
						</a>{" "}
						and{" "}
						<a className="font-bold" href="https://react.dev/">
							React
						</a>
						!
					</p>
				</div>
			)}
		</div>
	);
}
