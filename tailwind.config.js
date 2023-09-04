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
				button: 'var(--color-bg-button)',
			},
			textColor: {
				primary: 'var(--color-text-primary)',
				'primary-inverse': 'var(--color-text-primary-inverse)',
			},
			backgroundColor: {
				primary: 'var(--color-bg-primary)',
				'primary-hover': 'var(--color-bg-primary-hover)',
				secondary: 'var(--color-bg-secondary)',
				input: 'var(--color-bg-input)',
				details: 'var(--color-bg-details)',
				'post-side': 'var(--color-bg-post-side)',
				orange: 'var(--color-bg-orange)',
			},
			borderColor: {
				input: 'var(--color-border-input)',
				post: 'var(--color-border-post)',
				'post-hover': 'var(--color-border-post-hover)',
			},
		},
	},
};
