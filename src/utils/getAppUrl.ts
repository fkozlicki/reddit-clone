export function getAppUrl() {
	if (process.env.NODE_ENV === 'development') {
		return 'http://localhost:3000';
	}

	return `https://${
		process.env.VERCEL_URL ?? process.env.NEXT_PUBLIC_VERCEL_URL
	}`;
}
