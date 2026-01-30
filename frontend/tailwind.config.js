// File to configure Tailwind CSS settings using ESM syntax
import { defineConfig } from "tailwindcss/helpers";

export default defineConfig({
	content: [
		"./src/**/*.{html,js,jsx,ts,tsx}", // Adjust paths as necessary
	],
	plugins: [],
});
