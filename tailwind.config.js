/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			boxShadow: {
				tab: 'inset 0 -2px 0 0 var(--color-text-primary)',
			},
			textColor: {
				primary: 'var(--color-text-primary)',
				'primary-inverse': 'var(--color-text-primary-inverse)',
				'primary-light': 'var(--color-text-primary-light)',
			},
			backgroundColor: {
				primary: 'var(--color-bg-primary)',
				'primary-hover': 'var(--color-bg-primary-hover)',
				secondary: 'var(--color-bg-secondary)',
				input: 'var(--color-bg-input)',
				details: 'var(--color-bg-details)',
				'post-side': 'var(--color-bg-post-side)',
				orange: 'var(--color-bg-orange)',
				'orange-hover': 'var(--color-bg-orange-hover)',
				'btn-text': 'var(--color-btn-text-bg)',
				'btn-primary': 'var(--color-btn-primary)',
				'btn-primary-hover': 'var(--color-btn-primary-hover)',
			},
			borderColor: {
				input: 'var(--color-border-input)',
				post: 'var(--color-border-post)',
				'post-hover': 'var(--color-border-post-hover)',
				'text-btn': 'var(--color-btn-text-bg)',
			},
		},
	},
};
