// Button component
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
	return (
		<button
			{...props}
			className={`
                px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 active:scale-95
                focus:outline-none focus:ring-2 focus:ring-blue-500
                ${props.className || ""}
            `}
		>
			{children}
		</button>
	);
};

export default Button;
