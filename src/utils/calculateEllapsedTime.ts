export const calculateEllapsedTime = (date: Date): string => {
	const now = new Date();
	const ellapsed = now.getTime() - date.getTime();

	const seconds = Math.floor(ellapsed / 1000);
	const minutes = Math.floor(ellapsed / (60 * 1000));
	const hours = Math.floor(ellapsed / (60 * 60 * 1000));
	const days = Math.floor(ellapsed / (60 * 60 * 1000 * 24));

	if (days > 0) {
		return days + ' days ago';
	}

	if (hours > 0) {
		return hours + ' hours ago';
	}

	if (minutes > 0) {
		return minutes + ' minutes ago';
	}

	return seconds + ' seconds ago';
};
