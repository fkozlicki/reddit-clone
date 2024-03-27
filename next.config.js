/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		swcPlugins: [['next-superjson-plugin', {}]],
	},
	images: {
		domains: [
			'lh3.googleusercontent.com',
			'redditv2.s3.eu-central-1.amazonaws.com',
		],
	},
	reactStrictMode: false,
};

module.exports = nextConfig;
