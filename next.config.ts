import { NextConfig } from 'next';

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{ hostname: 'lh3.googleusercontent.com' },
			{ hostname: 'redditv2.s3.eu-central-1.amazonaws.com' },
		],
	},
	reactStrictMode: false,
};

export default nextConfig;
