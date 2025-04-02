/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{ hostname: 'lh3.googleusercontent.com' },
			{ hostname: 'redditv2.s3.eu-central-1.amazonaws.com' },
		],
	},
	reactStrictMode: false,
};

module.exports = nextConfig;
