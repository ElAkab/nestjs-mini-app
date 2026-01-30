import { NavLink } from "react-router-dom";

type HeaderLink = {
	href: string;
	label: string;
};

type HeaderProps = {
	links?: HeaderLink[];
	title?: string;
};

export default function Header({ links, title }: HeaderProps) {
	return (
		<header className="bg-blue-600 text-white p-4">
			<nav className="flex justify-evenly items-center w-full max-w-4xl mx-auto">
				{/* Titre */}
				<span className="font-bold text-xl">{title || "My App"}</span>

				{/* Liens */}
				<div className="flex gap-4">
				{links &&
					links.map((link, index) => (
						<NavLink
							key={index}
							to={link.href}
							className={({ isActive }) =>
								`${isActive ? "underline font-semibold" : ""}`
							}
						>
							{link.label}
						</NavLink>
					))}
				</div>
			</nav>
		</header>
	);
}
