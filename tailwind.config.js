/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				primary: '#0079d3',
				orange: '#ff4500',
				success: 'green',
				danger: 'red',
				'background-primary': '#fff',
				'background-feed': '#dae0e6',
				'background-input': '#f6f7f8',
				'background-post-side': '#f8f9fa',
				'border-input': '#edeff1',
				'border-post': '#ccc',
				'border-post-hover': '#898989',
				'button-hover': '#1a1a1b1a',
				'text-gray': '#878a8c',
			},
		},
	},
};
